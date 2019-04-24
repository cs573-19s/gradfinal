import csv
import random

# generates a csv file of num many ip addresses


def generate_ips(number):

    with open("ips.csv", mode='w') as ip_file:
        ip_writer = csv.writer(ip_file, delimiter=',')
        ip_prefix = '172.52.56.'

        ip_writer.writerow(['ip_addr', 'neighbours'])

        # dictionary where key is ip address and val is list of neighbour ip_addresses
        ip_dict = {}

        for num in range(number):

            ip_postfix = str(random.randint(0, 255))

            # make sure not generate the same ip address more than once
            while ip_prefix + ip_postfix in ip_dict:
                ip_postfix = str(random.randint(0, 255))

            ip_address = ip_prefix + ip_postfix
            ip_dict[ip_address] = []

        for addr in ip_dict:
            keys = list(ip_dict.keys())
            num_neighbours = random.randint(1, 20)
            for num in range(num_neighbours):
                potential_neighbour = keys[random.randint(0, len(keys) - 1)]
                while potential_neighbour in ip_dict[addr] or potential_neighbour == addr:
                    potential_neighbour = keys[random.randint(0, len(keys) - 1)]

                ip_dict[addr].append(potential_neighbour)

        for ip in ip_dict:
            ip_writer.writerow([ip, ip_dict[ip]])


generate_ips(50)

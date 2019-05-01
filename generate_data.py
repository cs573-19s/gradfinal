import json
import random

# generates a csv file of num many ip addresses


def generate_ips(number, links):

    data = {}

    ip_prefix = '172.52.56.'

    # dictionary where key is id and val is ip address and val is list of neighbour ip_addresses
    ip_dict = {}

    # dictionary where key is source id and val is target id
    link_list = []
    reverse_link_list = []

    # Generate Nodes
    for num in range(number):

        ip_postfix = str(random.randint(0, 255))

        # make sure not generate the same ip address more than once
        while ip_prefix + ip_postfix in ip_dict:
            ip_postfix = str(random.randint(0, 255))

        ip_address = ip_prefix + ip_postfix
        ip_dict[num] = ip_address

    # Generate links
    keys = list(ip_dict.keys())
    for num in range(links):
        source = keys[random.randint(0, len(keys) - 1)]
        target = keys[random.randint(0, len(keys) - 1)]
        while (source, target) in link_list or (target, source) in reverse_link_list or source == target:
            source = keys[random.randint(0, len(keys) - 1)]
            target = keys[random.randint(0, len(keys) - 1)]

        link_list.append((source, target))
        reverse_link_list.append((target, source))

    data['links'] = []
    data['nodes'] = []

    for node in ip_dict:
        data['nodes'].append({
            'id': node,
            'name': ip_dict[node]
        })

    for tup in link_list:
        data['links'].append({
            'source': tup[0],
            'target': tup[1]
        })

    with open('ips.json', 'w') as outfile:
        json.dump(data, outfile)


generate_ips(50, 200)

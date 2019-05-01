#!/bin/bash
# Creates a certain number of containers running bots

for i in {1..15}
do
	sudo docker run -v /home/asolergayoso/gradfinal:/root/host-share -d asolergayoso/bot /root/bot_init
done

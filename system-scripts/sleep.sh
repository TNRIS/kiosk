#!/bin/bash

# That is not dead which can eternal lie,
# And with strange aeons even death may die. -Abdul Alhazred

sleep 7

# Freezes all processes for 45000 seconds (12.5 hrs)
sudo rtcwake -m freeze -l -s 45000

sleep 5

su tnris -c "/home/tnris/start-kiosk.sh"

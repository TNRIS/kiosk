#!/bin/bash

# We live on a placid island of ignorance in the midst of black seas of infinity,
# and it was not meant that we should voyage far.

# If Chromium crashes (usually due to rebooting),
# clear the crash flag so we don't have the annoying warning bar

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' snap/chromium/367/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' snap/chromium/367/.config/chromium/Default/Preferences

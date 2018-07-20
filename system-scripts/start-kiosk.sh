#!/bin/bash

# Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn...
# In his house at R'lyeh dead Cthulhu waits dreaming.

export DISPLAY=:0

/snap/bin/chromium \
  --kiosk \
  --profile-directory=Default\
  --test-type \
  --disable-web-security \
  --user-data-dir \
  http://kiosk.tnris.org

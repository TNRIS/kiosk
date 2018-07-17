# kiosk
an app for viewing apps on a kiosk

### Overview/Background
This projects is a simple web application that can be accessed by visiting the url http://kiosk.tnris.org. It is hosted directly from this repository (repo) using GitHub Pages with a custom domain. The site was created specifically to be displayed on the Texas Water Development Board's kiosk (see below photo) to act as a menu for viewing other existing TWDB web applications. Based on the user's selection from the kiosk menu, the kiosk app creates a window to that app using a dynamically created iframe while allowing the user to go back to a previous page or to the main menu from the bottom navigation bar. The bottom navigation bar is necessary due to the browser on the kiosk being in fullscreen mode or kiosk mode, so the traditional browser navigation menu is not present. The url of the app the user selects from the menu is displayed at the bottom right of the navigation bar.

![twdb kiosk](https://github.com/TNRIS/kiosk/blob/gh-pages/css/img/kiosk.jpg)

The kiosk hardware consists of a small Dell computer with Ubuntu 18.04 Bionic Beaver operating system installed. The kiosk is put to sleep and awaken by a Cron job. When the kiosk wakes, a Bash script runs Chromium in kiosk mode (full screen). More detail regarding the Cron job and Bash script are in the job scheduler section below.

### Required Components
#### Web Application
* [GitHub Pages](https://pages.github.com/)
* [jQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Google Fonts](https://fonts.google.com/specimen/Montserrat)

#### Kiosk
* [Ubuntu 18.04](http://releases.ubuntu.com/releases/18.04/)
* [Chromium](https://www.chromium.org/Home)
* [Bash](https://www.gnu.org/software/bash/)
* [Cron](https://en.wikipedia.org/wiki/Cron)
* [Photo Screen Saver](https://chrome.google.com/webstore/detail/photo-screen-saver/kohpcmlfdjfdggcjmjhhbcbankgmppgc?hl=en-US)

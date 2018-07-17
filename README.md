# kiosk
an app for viewing apps on a kiosk

### Overview/Background
This projects is a simple web application that can be accessed by visiting the url http://kiosk.tnris.org. It is hosted directly from this repository (repo) using GitHub Pages with a custom domain. The site was created specifically to be displayed on the Texas Water Development Board's kiosk (see below photo) to act as a menu for viewing other existing TWDB web applications. Based on the user's selection from the kiosk menu, the kiosk app creates a window to that app using a dynamically created iframe while allowing the user to go back to a previous page or to the main menu from the bottom navigation bar. The bottom navigation bar is necessary due to the browser on the kiosk being in fullscreen mode or kiosk mode, so the traditional browser navigation menu is not present. The url of the app the user selects from the menu is displayed at the bottom right of the navigation bar.

![twdb kiosk](https://github.com/TNRIS/kiosk/blob/gh-pages/css/img/kiosk.jpg)

The kiosk hardware consists of a small Dell computer with Ubuntu 18.04 Bionic Beaver operating system installed. The kiosk is put to sleep and awaken by a Cron job. When the kiosk wakes, a Bash script runs Chromium in kiosk mode (full screen). More detail regarding the Cron job and Bash script are in the job scheduler section below.

### Components
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

### Bash
Command flags to run Chromium in kiosk mode and without web security are very important for this project to work properly. Kiosk mode prevents users from being able to use the browser as they would on their own machines, which would allow them to type in any url and browse the internet. We do not want this ability for users. Additionally, developers cannot normally iterate through or traverse an iframe's html elements with javascript due to security protocols. But, for this very specific purpose, we needed this ability to prevent users from clicking links that may open new tabs. If this happened, the user would be stuck with no ability to exit the new tab since the navigation bar would be gone and the traditional browser navigation menus are absent. Disabling web security in Chromium allows for traversing an iframe's html elements and preventing links to be opened in new tabs.

The command flags needed for disabling web security and launching Chromium in kiosk mode are:
`chromium-browser --kiosk --disable-web-security --user-data-dir`

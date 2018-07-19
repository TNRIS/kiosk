# **kiosk**
an app for viewing apps on a kiosk

### Overview
This projects is a simple web application that can be accessed by visiting the url http://kiosk.tnris.org. It is hosted directly from this repository (repo) using GitHub Pages with a custom domain. The site was created specifically to be displayed on the Texas Water Development Board's kiosk (see below photo) to act as a menu for viewing other existing TWDB web applications. Based on the user's selection from the kiosk menu, the kiosk app creates a window to that app using a dynamically created iframe while allowing the user to go back to a previous page or to the main menu from the bottom navigation bar. The bottom navigation bar is necessary due to the browser on the kiosk being in fullscreen mode or kiosk mode, so the traditional browser navigation menu is absent. The url of the app the user selects from the menu is displayed at the bottom right of the navigation bar.

![twdb kiosk](https://github.com/TNRIS/kiosk/blob/gh-pages/css/img/kiosk.jpg)

The kiosk hardware consists of a small Dell computer with Ubuntu 18.04 Bionic Beaver operating system installed. The kiosk is put to sleep and awaken by a Cron job. When the kiosk wakes, a Bash script runs Chromium in kiosk mode (full screen) with web-security disabled so the app can remove any links where target attributes are present (see more detail below in Bash section).

### Components
#### Web Application
* [GitHub Pages](https://pages.github.com/)
* [jQuery v3.3.1](https://jquery.com/)
* [Bootstrap v4.1.1](https://getbootstrap.com/)
* [Google Fonts - Montserrat](https://fonts.google.com/specimen/Montserrat)
* [Font Awesome v5.1.1](https://fontawesome.com/)
* [AWS Route 53](https://aws.amazon.com/route53/)

For local development / testing:
* [node.js v8.11.1](https://nodejs.org/en/blog/release/v8.11.1/)
* [http-server](https://www.npmjs.com/package/http-server)
 * `npm install http-server -g`

#### Kiosk
* [Ubuntu 18.04](http://releases.ubuntu.com/releases/18.04/)
* [Chromium](https://www.chromium.org/Home)
* [Bash](https://www.gnu.org/software/bash/)
* [Cron](https://en.wikipedia.org/wiki/Cron)
* [Photo Screen Saver](https://chrome.google.com/webstore/detail/photo-screen-saver/kohpcmlfdjfdggcjmjhhbcbankgmppgc?hl=en-US)

### DNS
Amazon Web Services (AWS) [Route 53]() is used for the Domain Name System (DNS) web service to register kiosk.tnris.org, the custom domain for this application, which is a subdomain of tnris.org.

### Bash
Command flags to run Chromium in kiosk mode and without web security are very important for the kiosk to work properly. The `--kiosk` flag prevents users from being able to use the kiosk browser in a traditional manner with full navigation controls and access to the address bar. We do not want this functionality for users.

Additionally, developers do not normally iterate through or traverse an iframe's html elements with javascript due to security protocols. But, for the very specific purpose of a kiosk, we need this ability in order to prevent users from clicking links that may open new tabs. If new tabs are opened in kiosk mode, the user would be stuck with no ability to exit the new tab since the navigation bar would be gone and the traditional browser navigation menus are absent. Disabling web security with the `--disable-web-security --user-data-dir` command flag allows for iterating an iframe's anchor tags with javascript to search for and prevent any links where the `target` attribute is present.

The full command with flags needed for disabling web security and launching Chromium in kiosk mode are:

`chromium-browser --kiosk --disable-web-security --user-data-dir`

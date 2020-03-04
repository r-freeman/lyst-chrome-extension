# Lyst

Lyst is an online shopping companion app and full stack web application. This is the frontend component of the application, installed as a browser extension in Google Chrome.

### Technologies

* [Vue.js](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Tailwind CSS](https://tailwindcss.com/) 

### Build tools

* [Webpack](https://webpack.js.org/)

### Prerequisites

The browser extension component consumes an API from a separate [Laravel app](https://github.com/r-freeman/lyst), which is required for the browser extension to function. Install the Laravel app before installing this component.


### Screenshots

![Creating an account](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_.png)

![Log in](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-1.png)

![Items](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-2.png)

![Edit item](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-6.png)

![Lists](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-3.png)

![View list](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-4.png)

![Edit list](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-5.png)

## Configuration

Once the Laravel app has been installed locally, change the BASE_URL configuration variable in ./src/popup/config.js to the url of the Laravel app.

```javascript
export const BASE_URL='http://localhost/api/v1/'
```

## Set up development environment

### Install dependencies

Use [yarn](https://yarnpkg.com/) package manager to install dependencies.

```bash
yarn install
```

### Development

To start the development environment in the browser.

```bash
yarn start
```

### Production build

To create a production build of the application. 

```
yarn build
```

## Install in Google Chrome

The browser extension is not distributed in the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions?). Instead, generate a production build as above. The build will be compiled into the ./build directory. Next, go into Settings > More Tools > Extensions in Google Chrome.

![load unpacked](https://developer.chrome.com/static/images/get_started/load_extension.png)

Enable Developer mode, choose load unpacked and select the build directory. The extension should now be installed in the browser.
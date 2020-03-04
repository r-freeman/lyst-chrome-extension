# Lyst

Lyst is an online shopping companion app and full stack web application. This is the front end component of the application, installed as a browser extension in Google Chrome.

## Technologies

### Front End

* [Vue.js](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Tailwind CSS](https://tailwindcss.com/) 

### Build tools

* [Webpack](https://webpack.js.org/)

## Prerequisites

The browser extension component consumes an API from a separate [Laravel app](https://github.com/r-freeman/lyst-api), which is required for the browser extension to function. Install the Laravel app before installing this component.

### Configuration

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

## Screenshots

![Creating an account](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_.png)

![Log in](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-1.png)

![Items](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-2.png)

![Edit item](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-6.png)

![Lists](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-3.png)

![View list](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-4.png)

![Edit list](https://gentile-garden.s3.amazonaws.com/uploads/2020/03/localhost_8080_-5.png)

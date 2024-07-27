# Readme

<h1 align="center">Green Heat Clima</h1>
<p align="center"> Green Heat Clima es una empresa dedicada a brindar servicios de asesoramiento, mantenimiento, venta e instalación de productos de calefacción y refrigeración. </p>
<p><img src="https://api.netlify.com/api/v1/badges/61cce66f-167b-4dba-af85-6d66da2457c8/deploy-status"></p>
<p align="center"><img src="src/assets/icons/favicon-192x192.png"/></p>

## Tabla de contenidos:
---

- [Descripción y contexto](#descripción-y-contexto)
- [Guía de instalación](#guía-de-instalación)
- [Comandos](#comandos)
- [Dependencias](#dependencias)
- [Autor/es](#autores)

## Descripción y contexto
---

Green Heat Clima es una empresa de calefacción y refrigeración, radicada en Argentina, que brinda sus servicios exclusivamente a clientes establecidos en Buenos Aires o alrededores.

Esta herramienta tiene el objetivo de presentar los servicios, clientes, trabajos y medios de comunicación que brinda Green Heat Clima a sus clientes.

## Guía de instalación
---

Pasos de instalación:
1. Abrir una terminal de comando y, sobre la raíz del proyecto escribir npm i.
2. Al terminar la instalación, usar el comando npm run build para preparar el entorno en modo producción.
3. Ejecutar el comando npm run serve:ssr:green-heat y abrir la url localhost:4000/es o localhost:4000/en.

Tecnologías necesarias:
- Node >= 20.11.1.
- Sistema Operativo Windows, MacOS o Linux.
- Compilador Vite. 
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.

## Comandos
---

    "ng": "ng",
    "start": "ng serve",
    "start:en": "ng serve --configuration=en",
    "build": "ng build && node scripts/copy-proxy-server.js && node scripts/move-server-directory.js",
    "watch": "ng build --watch --configuration development",
    "test": "ng test --no-watch --no-progress --browsers=ChromeHeadless",
    "e2e": "ng e2e",
    "serve:ssr:green-heat": "node dist/green-heat/proxy-server.mjs",
    "extract:locales": "ng extract-i18n --output-path src/locale",
    "lint": "ng lint",
    "lint:styles": "stylelint \"src/**/*.scss\"",
    "compodoc:build": "compodoc -p tsconfig.doc.json",
    "compodoc:build-and-serve": "compodoc -p tsconfig.doc.json -s",
    "compodoc:serve": "compodoc -s"

## Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build sourcemap

Run `npm run build:sourcemap` to build the sourcemap project. See result on `node_modules/.bin/source-map-explorer dist/green-heat/browser/main*`.

## Build localize

Run `npm run build:localize` to build the project with localize. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running unit tests

Run `npm run e2e` to execute the e2e tests via [Puppeteer](https://github.com/puppeteer/puppeteer).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Running lint component

Run `npm run lint` to execute the linter component validations.

## Running lint styles

Run `npm run lint:styles` to execute the linter styles validations.

## Running documentation

Run `npm run compodoc:build` to execute the documentation generate command.

## Running extract locales

Run `npm run extract:locales` to execute the extract and merge locales.

## Running production server

Run `npm run serve:ssr:green-heat` to execute the production server. Firsts it is necessary run `npm run build`.

## Dependencias
---

    "dependencies":
        "@angular/animations": "^18.0.1",
        "@angular/common": "^18.0.1",
        "@angular/compiler": "^18.0.1",
        "@angular/core": "^18.0.1",
        "@angular/forms": "^18.0.1",
        "@angular/platform-browser": "^18.0.1",
        "@angular/platform-browser-dynamic": "^18.0.1",
        "@angular/platform-server": "^18.0.1",
        "@angular/router": "^18.0.1",
        "@angular/ssr": "^18.0.2",
        "express": "^4.19.2",
        "rxjs": "~7.8.1",
        "tslib": "^2.6.2",
        "zone.js": "~0.14.6"

    "devDependencies":
        "@angular-devkit/build-angular": "^18.0.2",
        "@angular-eslint/builder": "18.0.1",
        "@angular-eslint/eslint-plugin": "18.0.1",
        "@angular-eslint/eslint-plugin-template": "18.0.1",
        "@angular-eslint/schematics": "18.0.1",
        "@angular-eslint/template-parser": "18.0.1",
        "@angular/cli": "^18.0.2",
        "@angular/compiler-cli": "^18.0.1",
        "@angular/localize": "^18.0.1",
        "@axe-core/puppeteer": "^4.9.1",
        "@compodoc/compodoc": "^1.1.25",
        "@types/express": "^4.17.21",
        "@types/jasmine": "~5.1.4",
        "@types/node": "^20.13.0",
        "@typescript-eslint/eslint-plugin": "7.11.0",
        "@typescript-eslint/parser": "7.11.0",
        "eslint": "8.57.0",
        "jasmine-core": "~5.1.2",
        "karma": "~6.4.3",
        "karma-chrome-launcher": "~3.2.0",
        "karma-coverage": "~2.2.1",
        "karma-jasmine": "~5.1.0",
        "karma-jasmine-html-reporter": "~2.1.0",
        "ng-extract-i18n-merge": "^2.11.2",
        "source-map-explorer": "^2.5.3",
        "stylelint": "^16.6.1",
        "stylelint-config-sass-guidelines": "^11.1.0",
        "stylelint-scss": "^6.3.0",
        "typescript": "~5.4.5",
        "puppeteer": "22.13.1",
        "jasmine": "5.2.0"

## Autor/es
---

Agustin Cammarota Muti - agustincammarota@hotmail.com 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

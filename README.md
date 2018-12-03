# ABMstock
Control simple de Inventario

Práctica con api Rest express+sequelize+postgres para una app web en angular,
incluye ABM artículos, rubros, clientes, proveedores y 
los ingresos y egresos del inventario mediante facturas de compras y ventas
respectivamente.

Más detalles en el archivo [consignas.txt](https://github.com/AnibalFlores/abmstock/blob/master/src/consignas.txt)

#
## Instrucciones

Ejecutar `npm i --save` tanto en la carpeta del proyecto como en la carpeta **server**.

Para Postgres: crear una DB primero, ver datos de conexión en archivo [env.js](https://github.com/AnibalFlores/abmstock/blob/master/server/app/configs/env.js)

Para iniciar el api rest: desde un terminal en la carpeta **server** ejecutar `node index.js` en la carpeta

Para iniciar la app simplemente `ng serve` en la carpeta **abmstock**

Saludos, Aníbal.-
#

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# ToDoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4. This ToDo App developed using Angular as a frontend. It call REST apis to interact with relational database. This is a role based application with User and Admin role. User can login, add todo tasks, move it from Todo to Inprogress to Done and can translate task from English to Hindi. Admin can do all user role can do plus can see users and thier translate history

## Pre-requisite

This application follows latest architecture pattern where angular app talks to backend REST APIs which talks to backend database. Ideally this APIs should have been written on node, but due to short timeframe, It has been develoved in ASP.net core web api with entitiy framework core.

These APIs are deployed on Microsoft Azure cloud. Make sure URL configured accordingly

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

There are two environment files congifured so if you want to build it for specific environment, you can use `ng build --env=production` or `ng build --env=development`

You can also change backend API URL (apiUrl), goolge translate api url (googleApiUrl) and api key (googleApiKey) in these environment config files located under the src\app\environments folder. File names are environment.dev.ts and environment.prod.ts

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. However, this part has not yet been completed due to time constraint. This can be done in future

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

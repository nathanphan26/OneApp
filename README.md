# OneApp

An all in one application to view social media feeds.

## Getting Started

The following instructions will get you a copy of the project running on your local machine. 

### Prerequisites

Our application runs off the MEAN Stack so the following dependencies are required.

#### Node.js

You can download Node.js from their [website](https://nodejs.org/en/download/)

or through homebrew 

```
brew install node
```

#### MongoDB

Download MongoDB from their [website](https://www.mongodb.com/download-center#community)

or through homebrew

```
brew install mongodb
```

#### AngularJS

Download angular-cli through npm with 

```
npm install -g @angular/cli
```

Run the web server (http://localhost:4200) with

```
ng serve
```

### Building the app

Once you have the source files, run 

```
npm install
```

to compile the code. 

### Running the app

Start MongoDB with 

```
net start MongoDB
```

Navigate into the 'angular-src' folder and run

```
ng build
```

to compile your code into a public folder. You can then serve your application with

```
npm start
```

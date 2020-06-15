# html5-scada

## Description

The project is node based SCADA like app. Node server connect to matlab/simulink simulation via TCP and communicate with clients using HTTP+WebSockets. The node server should be started first, then simulink model. Then users can join using web browser. The view is designed for mobile devices. The app allows to control input and PID terms. The response of control system is draw on plot in real time.

The project was created for the purposes of academic classes and will probably not be developed.

## Setup

```sh
$ npm install #install dependencies
```

## Run

```sh
$ npm start #run server on localhost
$ ADDRESS=192.168.0.1 npm start #run server on specified interface
```

Web server port: `3000`<br/>
TCP server port: `2137`

## Main Dependencies

- [Vue](https://vuejs.org/) frontend framework
- [ExpressJs](https://expressjs.com/) web server framework
- [socket.io](https://socket.io/) websockets
- [smoothiecharts](http://smoothiecharts.org/) nice, tiny chart package

## Screenshots

App view

<p float="left">
  <img src="https://user-images.githubusercontent.com/27036554/84608858-a98a9780-aeb4-11ea-8ad4-316b5b5051f8.png" width="200" />
  <img src="https://user-images.githubusercontent.com/27036554/84608880-c0c98500-aeb4-11ea-9094-8e43af7b84e4.png" width="200" /> 
  <img src="https://user-images.githubusercontent.com/27036554/84609033-71378900-aeb5-11ea-8cd5-47c3c9d4de62.png" width="200" />
</p>

Example matlab project

<img src="https://user-images.githubusercontent.com/27036554/84609062-9e843700-aeb5-11ea-930a-979df1cf9a3f.png" width="600">

## Requirements for simulink model

The model need to read 4 variables over TCP of type double BigEndian in non-blocking mode. The order of numbers are: `input`, `Kp`, `Ti`, `Td`.
To get feedback from matlab, the model should emit response, single value the same kind as the input variables over TCP.

## Known issues

- `Current values` do not sync between clients.
- Updating PID terms change input too (especially cumbersome when using more than one client device, or after refresh of webpage)

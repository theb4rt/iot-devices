This project uses the serial port to connect to a microcontroller with a RaspberryPI.
It reads this data in real time and establishes a bidirectional communication between the microcontroller and the RPI, 
it also uses Websockets to allow real-time communication with the frontend.
If you use docker, you will need to enable the serial port through the host to your container. 
Mabye you will have to run docker using root or enable a service to send data to the container to avoid using docker as root.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

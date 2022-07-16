# Coffy Backend
This is the coffy app Backend repository. Coffy is a coffee store app that aims to manage orders from customers in a simple way. 
You may notice that the architecture of this project has been done with lots of overengineering, but this is because I am using it to test multiple patterns and technologies such as Microservice architecture, Websocket, gRPC, REST, and soon GraphQL as well.


## Summary
- [Orders Service](#user-content-orders-service)
- [Auth Service](#user-content-auth-service)

## Setup

---

## Orders service
Orders service is a Nest.JS API responsible for handle orders comming from the mobile app [coffy](https://github.com/robertokbr/coffy).
It comunicates with the auth-service gRPC api to create sessions and manage authorizations.
As well as it uses websocket to emit real time events.   

### 🚗 How to run 
```bash
  # enter the path
  cd orders-service
  
  # download deps
  npm install

  # run db setup
  npm run setup:dev

  # run 
  npm run start:dev
```

### 🔭 How to visualize the db schema
```bash
  npm run db:show
```

---

## Auth service
Auth service is a microservice responsible for the authentication of the mobile app [coffy](https://github.com/robertokbr/coffy), which I have been building using ```gRPC```, as a way to learn better this technology and its integration with other APIs.

### 📓 What is gRPC
The gRPC is a google tech, which aims to be the evolution of the RPC architecture (Remote Procedure Call). For being HTTP2 based, the gRPC is way faster than the REST, not only because of the HTTP2 multiplexing, which allows the API to receive many requests in just one connection, but also because of the use of protobufs, which is an IDL ( Interface Definition Language ) used to define the gRPC services, and serialize the income and outcome data by:

- separating the message context from it data:
  - Istead of the common json format: ```{ "key": "value" }``` - protobufs organize the values by indexes that represent the value key: ```{ string value = 1 }``` - which minimizes payload wheight.

- Serializing the message content from text to binary.
  - The transmission of binary is pretty faster than text, also the HTTP2 compresses the binary, turning the transmission faster and lighter in terms of CPU usage.

### 🗒️ User histories
- [x] It should be able to generate random passcodes, with an expiration time of 1 hour, that will be used to create the user authentication, which is necessary to create orders. The passcode should be provided by the coffy manager to their clients, as a way to avoid users creating fake orders from anywhere outside the coffee store.
- [x] It should be able to create authentications by a passcode and a user name, and return a jwt with 1 hour of expiration time, that contains as payload the user name and the generated user id.
- [x] It should be to update the session JWT with some old JWT and a new passcode.
- [x] It should be able to decode the JWT and return the user payload.

### 🛠️ VSCode Extensio
VScode proto-3 to.

### 🧪 Test tools
- Kreya grpc client

### 📦 App Tools
- @grpc/proto-loader
- grpc

### 📔 Protobuf version
- 3.0

### References
- [gRPC bookstore](https://github.com/rocketseat-experts-club/grpc-bookstore) repository

### 🚗 How to run 
```bash
  # enter the path
  cd auth-service
  
  # download deps
  npm install

  # init database
  npm run migration:run

  # run 
  npm run dev
```
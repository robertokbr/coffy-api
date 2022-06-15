# Coffy Backend
This is the coffy mobile app Backend repository. It has been made using Nestjs and grpc-js to create microservices and the API gateway.

## Summary
- [Orders Service](#user-content-orders-service)
- [Auth Service](#user-content-auth-service)

---

## Orders service
Orders service is a Nest.JS API responsible for handle orders comming from the mobile app [coffy](https://github.com/robertokbr/coffy).

### 🚗 How to run 
```bash
  # database
  docker-compose up -d

  # download deps
  npm run install

  # run setup dev
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

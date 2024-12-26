# Vitinya - Your caffeine friend

## Vitinya backend with AWS CDK AppSync, Lambda and Dynamodb

This repository contains a CDK project to build the backend components of the Vitinya sample app.

## Features

- AWS CDK based IaC for
  - GraphQL implementation
  - AWS Lambda function for data creation and retrieval
  - AWS DynamoDB data storage

### Query

```graphql
query listOrderQuery {
  listOrders {
    id
    coffee
    name
    mobileNumber
  }
}
```

### Mutation

```graphql
mutation createOrder {
  createOrder(newOrder: { id: "001", name: "David Bowman", coffee: "Latte", mobileNumber: "022123123" }) {
    id
    name
    coffee
    mobileNumber
  }
}
```

---

### React UI project is [here](https://github.com/karu-lk/vitinya-web).
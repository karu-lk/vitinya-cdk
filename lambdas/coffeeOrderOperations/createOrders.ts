import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { CoffeeOrder } from '../types/Order';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const createOrder = async (newOrder: CoffeeOrder) => {
  const params = new PutCommand({
    TableName: process.env.TBL_COFFEE_ORDERS as string,
    Item: newOrder,
  });

  try {
    const response = await docClient.send(params);

    if (response.$metadata.httpStatusCode === 200)
      return newOrder;
    else
      return null;

  } catch (error) {
    console.log('dynamodb error: ', error);
    return null;
  }
};


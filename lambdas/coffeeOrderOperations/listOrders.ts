import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, paginateScan } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const listOrders = async () => {
  const params = {
    TableName: process.env.TBL_COFFEE_ORDERS as string,
  };

  try {
    const paginator = paginateScan(
      {
        client: docClient,
      },
      {
        TableName: process.env.TBL_COFFEE_ORDERS as string
      }
    );

    const orders = [];
    for await (const page of paginator) {
      orders.push(...page.Items!);
    }

    return orders;
  } catch (error) {
    console.log('dynamodb error: ', error);
    return null;
  }
};


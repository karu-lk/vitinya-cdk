import { Duration, Expiration, Stack, StackProps } from 'aws-cdk-lib';
import {
  GraphqlApi,
  SchemaFile,
  AuthorizationType,
} from 'aws-cdk-lib/aws-appsync';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

export class AppsyncServerlessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new GraphqlApi(this, 'vitinya-api', {
      name: 'vitinya-api',
      schema: SchemaFile.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: Expiration.after(Duration.days(365)),
          },
        },
      },
      xrayEnabled: true,
    });

    const coffeeOrderLambda = new NodejsFunction(this, 'coffee-order-lambda', {
      functionName: 'coffee-order-lambda',
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, '../lambdas/orderLambda.ts'),
      memorySize: 1024,
    });

    const lambdaDataSource = api.addLambdaDataSource(
      'lambda-data-source',
      coffeeOrderLambda
    );

    lambdaDataSource.createResolver('query-resolver', {
      typeName: 'Query',
      fieldName: 'listOrders',
    });

    lambdaDataSource.createResolver('mutation-resolver', {
      typeName: 'Mutation',
      fieldName: 'createOrder',
    });

    const coffeeOrderTable = new Table(this, 'coffee-order-table', {
      tableName: 'coffee-order-table',
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    });

    coffeeOrderTable.grantFullAccess(coffeeOrderLambda);

    coffeeOrderLambda.addEnvironment('TBL_COFFEE_ORDERS', coffeeOrderTable.tableName);
  }
}


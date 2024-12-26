"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsyncServerlessStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_appsync_1 = require("aws-cdk-lib/aws-appsync");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const path_1 = require("path");
class AppsyncServerlessStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const api = new aws_appsync_1.GraphqlApi(this, 'vitinya-api', {
            name: 'vitinya-api',
            schema: aws_appsync_1.SchemaFile.fromAsset('graphql/schema.graphql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: aws_appsync_1.AuthorizationType.API_KEY,
                    apiKeyConfig: {
                        expires: aws_cdk_lib_1.Expiration.after(aws_cdk_lib_1.Duration.days(365)),
                    },
                },
            },
            xrayEnabled: true,
        });
        const coffeeOrderLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'coffee-order-lambda', {
            functionName: 'coffee-order-lambda',
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
            entry: (0, path_1.join)(__dirname, '../lambdas/orderLambda.ts'),
            memorySize: 1024,
        });
        const lambdaDataSource = api.addLambdaDataSource('lambda-data-source', coffeeOrderLambda);
        lambdaDataSource.createResolver('query-resolver', {
            typeName: 'Query',
            fieldName: 'listOrders',
        });
        lambdaDataSource.createResolver('mutation-resolver', {
            typeName: 'Mutation',
            fieldName: 'createOrder',
        });
        const coffeeOrderTable = new aws_dynamodb_1.Table(this, 'coffee-order-table', {
            tableName: 'coffee-order-table',
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST,
            partitionKey: {
                name: 'id',
                type: aws_dynamodb_1.AttributeType.STRING,
            },
        });
        coffeeOrderTable.grantFullAccess(coffeeOrderLambda);
        coffeeOrderLambda.addEnvironment('TBL_COFFEE_ORDERS', coffeeOrderTable.tableName);
    }
}
exports.AppsyncServerlessStack = AppsyncServerlessStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0aW55YS1hcHBzeW5jLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidml0aW55YS1hcHBzeW5jLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFzRTtBQUN0RSx5REFJaUM7QUFDakMsMkRBQTZFO0FBQzdFLHVEQUFpRDtBQUNqRCxxRUFBK0Q7QUFFL0QsK0JBQTRCO0FBRTVCLE1BQWEsc0JBQXVCLFNBQVEsbUJBQUs7SUFDL0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEdBQUcsR0FBRyxJQUFJLHdCQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUM5QyxJQUFJLEVBQUUsYUFBYTtZQUNuQixNQUFNLEVBQUUsd0JBQVUsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUM7WUFDdEQsbUJBQW1CLEVBQUU7Z0JBQ25CLG9CQUFvQixFQUFFO29CQUNwQixpQkFBaUIsRUFBRSwrQkFBaUIsQ0FBQyxPQUFPO29CQUM1QyxZQUFZLEVBQUU7d0JBQ1osT0FBTyxFQUFFLHdCQUFVLENBQUMsS0FBSyxDQUFDLHNCQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUM5QztpQkFDRjthQUNGO1lBQ0QsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQ3hFLFlBQVksRUFBRSxxQkFBcUI7WUFDbkMsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixLQUFLLEVBQUUsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLDJCQUEyQixDQUFDO1lBQ25ELFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUMsQ0FBQztRQUVILE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLG1CQUFtQixDQUM5QyxvQkFBb0IsRUFDcEIsaUJBQWlCLENBQ2xCLENBQUM7UUFFRixnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUU7WUFDaEQsUUFBUSxFQUFFLE9BQU87WUFDakIsU0FBUyxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFO1lBQ25ELFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxhQUFhO1NBQ3pCLENBQUMsQ0FBQztRQUVILE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUM3RCxTQUFTLEVBQUUsb0JBQW9CO1lBQy9CLFdBQVcsRUFBRSwwQkFBVyxDQUFDLGVBQWU7WUFDeEMsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU07YUFDM0I7U0FDRixDQUFDLENBQUM7UUFFSCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVwRCxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEYsQ0FBQztDQUNGO0FBckRELHdEQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER1cmF0aW9uLCBFeHBpcmF0aW9uLCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7XG4gIEdyYXBocWxBcGksXG4gIFNjaGVtYUZpbGUsXG4gIEF1dGhvcml6YXRpb25UeXBlLFxufSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBwc3luYyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBCaWxsaW5nTW9kZSwgVGFibGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgUnVudGltZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgTm9kZWpzRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLW5vZGVqcyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcblxuZXhwb3J0IGNsYXNzIEFwcHN5bmNTZXJ2ZXJsZXNzU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IEdyYXBocWxBcGkodGhpcywgJ3ZpdGlueWEtYXBpJywge1xuICAgICAgbmFtZTogJ3ZpdGlueWEtYXBpJyxcbiAgICAgIHNjaGVtYTogU2NoZW1hRmlsZS5mcm9tQXNzZXQoJ2dyYXBocWwvc2NoZW1hLmdyYXBocWwnKSxcbiAgICAgIGF1dGhvcml6YXRpb25Db25maWc6IHtcbiAgICAgICAgZGVmYXVsdEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICBhdXRob3JpemF0aW9uVHlwZTogQXV0aG9yaXphdGlvblR5cGUuQVBJX0tFWSxcbiAgICAgICAgICBhcGlLZXlDb25maWc6IHtcbiAgICAgICAgICAgIGV4cGlyZXM6IEV4cGlyYXRpb24uYWZ0ZXIoRHVyYXRpb24uZGF5cygzNjUpKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHhyYXlFbmFibGVkOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY29mZmVlT3JkZXJMYW1iZGEgPSBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgJ2NvZmZlZS1vcmRlci1sYW1iZGEnLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6ICdjb2ZmZWUtb3JkZXItbGFtYmRhJyxcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE4X1gsXG4gICAgICBlbnRyeTogam9pbihfX2Rpcm5hbWUsICcuLi9sYW1iZGFzL29yZGVyTGFtYmRhLnRzJyksXG4gICAgICBtZW1vcnlTaXplOiAxMDI0LFxuICAgIH0pO1xuXG4gICAgY29uc3QgbGFtYmRhRGF0YVNvdXJjZSA9IGFwaS5hZGRMYW1iZGFEYXRhU291cmNlKFxuICAgICAgJ2xhbWJkYS1kYXRhLXNvdXJjZScsXG4gICAgICBjb2ZmZWVPcmRlckxhbWJkYVxuICAgICk7XG5cbiAgICBsYW1iZGFEYXRhU291cmNlLmNyZWF0ZVJlc29sdmVyKCdxdWVyeS1yZXNvbHZlcicsIHtcbiAgICAgIHR5cGVOYW1lOiAnUXVlcnknLFxuICAgICAgZmllbGROYW1lOiAnbGlzdE9yZGVycycsXG4gICAgfSk7XG5cbiAgICBsYW1iZGFEYXRhU291cmNlLmNyZWF0ZVJlc29sdmVyKCdtdXRhdGlvbi1yZXNvbHZlcicsIHtcbiAgICAgIHR5cGVOYW1lOiAnTXV0YXRpb24nLFxuICAgICAgZmllbGROYW1lOiAnY3JlYXRlT3JkZXInLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY29mZmVlT3JkZXJUYWJsZSA9IG5ldyBUYWJsZSh0aGlzLCAnY29mZmVlLW9yZGVyLXRhYmxlJywge1xuICAgICAgdGFibGVOYW1lOiAnY29mZmVlLW9yZGVyLXRhYmxlJyxcbiAgICAgIGJpbGxpbmdNb2RlOiBCaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29mZmVlT3JkZXJUYWJsZS5ncmFudEZ1bGxBY2Nlc3MoY29mZmVlT3JkZXJMYW1iZGEpO1xuXG4gICAgY29mZmVlT3JkZXJMYW1iZGEuYWRkRW52aXJvbm1lbnQoJ1RCTF9DT0ZGRUVfT1JERVJTJywgY29mZmVlT3JkZXJUYWJsZS50YWJsZU5hbWUpO1xuICB9XG59XG5cbiJdfQ==
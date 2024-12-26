"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOrders = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const listOrders = async () => {
    const params = {
        TableName: process.env.TBL_COFFEE_ORDERS,
    };
    try {
        const paginator = (0, lib_dynamodb_1.paginateScan)({
            client: docClient,
        }, {
            TableName: process.env.TBL_COFFEE_ORDERS
        });
        const orders = [];
        for await (const page of paginator) {
            orders.push(...page.Items);
        }
        return orders;
    }
    catch (error) {
        console.log('dynamodb error: ', error);
        return null;
    }
};
exports.listOrders = listOrders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdE9yZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3RPcmRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOERBQTBEO0FBQzFELHdEQUE2RTtBQUU3RSxNQUFNLE1BQU0sR0FBRyxJQUFJLGdDQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEMsTUFBTSxTQUFTLEdBQUcscUNBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRS9DLE1BQU0sVUFBVSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sTUFBTSxHQUFHO1FBQ2IsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQTJCO0tBQ25ELENBQUM7SUFFRixJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsSUFBQSwyQkFBWSxFQUM1QjtZQUNFLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLEVBQ0Q7WUFDRSxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBMkI7U0FDbkQsQ0FDRixDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxJQUFJLFNBQVMsRUFBRTtZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQU0sQ0FBQyxDQUFDO1NBQzdCO1FBRUQsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFDO0FBekJXLFFBQUEsVUFBVSxjQXlCckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XG5pbXBvcnQgeyBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LCBwYWdpbmF0ZVNjYW4gfSBmcm9tIFwiQGF3cy1zZGsvbGliLWR5bmFtb2RiXCI7XG5cbmNvbnN0IGNsaWVudCA9IG5ldyBEeW5hbW9EQkNsaWVudCh7fSk7XG5jb25zdCBkb2NDbGllbnQgPSBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LmZyb20oY2xpZW50KTtcblxuZXhwb3J0IGNvbnN0IGxpc3RPcmRlcnMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRCTF9DT0ZGRUVfT1JERVJTIGFzIHN0cmluZyxcbiAgfTtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhZ2luYXRvciA9IHBhZ2luYXRlU2NhbihcbiAgICAgIHtcbiAgICAgICAgY2xpZW50OiBkb2NDbGllbnQsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRCTF9DT0ZGRUVfT1JERVJTIGFzIHN0cmluZ1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCBvcmRlcnMgPSBbXTtcbiAgICBmb3IgYXdhaXQgKGNvbnN0IHBhZ2Ugb2YgcGFnaW5hdG9yKSB7XG4gICAgICBvcmRlcnMucHVzaCguLi5wYWdlLkl0ZW1zISk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9yZGVycztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZygnZHluYW1vZGIgZXJyb3I6ICcsIGVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuIl19
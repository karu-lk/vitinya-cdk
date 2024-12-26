"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const createOrder = async (newOrder) => {
    const params = new lib_dynamodb_1.PutCommand({
        TableName: process.env.TBL_COFFEE_ORDERS,
        Item: newOrder,
    });
    try {
        const response = await docClient.send(params);
        if (response.$metadata.httpStatusCode === 200)
            return newOrder;
        else
            return null;
    }
    catch (error) {
        console.log('dynamodb error: ', error);
        return null;
    }
};
exports.createOrder = createOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlT3JkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlT3JkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUEwRDtBQUMxRCx3REFBMkU7QUFHM0UsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sU0FBUyxHQUFHLHFDQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUvQyxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsUUFBcUIsRUFBRSxFQUFFO0lBQ3pELE1BQU0sTUFBTSxHQUFHLElBQUkseUJBQVUsQ0FBQztRQUM1QixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBMkI7UUFDbEQsSUFBSSxFQUFFLFFBQVE7S0FDZixDQUFDLENBQUM7SUFFSCxJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEtBQUssR0FBRztZQUMzQyxPQUFPLFFBQVEsQ0FBQzs7WUFFaEIsT0FBTyxJQUFJLENBQUM7S0FFZjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFDO0FBbEJXLFFBQUEsV0FBVyxlQWtCdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XG5pbXBvcnQgeyBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LCBQdXRDb21tYW5kIH0gZnJvbSBcIkBhd3Mtc2RrL2xpYi1keW5hbW9kYlwiO1xuaW1wb3J0IHsgQ29mZmVlT3JkZXIgfSBmcm9tICcuLi90eXBlcy9PcmRlcic7XG5cbmNvbnN0IGNsaWVudCA9IG5ldyBEeW5hbW9EQkNsaWVudCh7fSk7XG5jb25zdCBkb2NDbGllbnQgPSBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LmZyb20oY2xpZW50KTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU9yZGVyID0gYXN5bmMgKG5ld09yZGVyOiBDb2ZmZWVPcmRlcikgPT4ge1xuICBjb25zdCBwYXJhbXMgPSBuZXcgUHV0Q29tbWFuZCh7XG4gICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UQkxfQ09GRkVFX09SREVSUyBhcyBzdHJpbmcsXG4gICAgSXRlbTogbmV3T3JkZXIsXG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkb2NDbGllbnQuc2VuZChwYXJhbXMpO1xuXG4gICAgaWYgKHJlc3BvbnNlLiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSA9PT0gMjAwKVxuICAgICAgcmV0dXJuIG5ld09yZGVyO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBudWxsO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coJ2R5bmFtb2RiIGVycm9yOiAnLCBlcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbiJdfQ==
import { createOrder, listOrders } from './coffeeOrderOperations';
import { CoffeeOrder } from './types/Order';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    coffeeOrderId: string;
    newOrder: CoffeeOrder;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  
  switch (event.info.fieldName) {
    case 'createOrder':
      return await createOrder(event.arguments.newOrder);

    case 'listOrders':
      return await listOrders();

    default:
      return null;
  }
};


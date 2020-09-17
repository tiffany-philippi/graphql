import { ApolloError } from "apollo-server-express";
import { getRepository } from "typeorm";
import { Order } from "../entities/Order";
import { Customer } from "../entities/Customer";

const orderResolver = {
  Order: {
    customer: (parent: Order) => {
      try {
        return getRepository(Customer).findOne(parent.customerNumber);
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Query: {
    orders: () => {
      //consulta dos orders no banco e devolver array
      try {
        return getRepository(Order).find();
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    order: (_: any, {id}: any) => {
      try {
        return getRepository(Order).findOne(id);
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Mutation: {
    updateOrderStatus: async (_: any, {id, status}: any, {user}: any) => {
      if (!user) throw new ApolloError('Usuário não autenticado');
      
      try {
        const order = await getRepository(Order).findOne(id);
        if (order) {
          order.status = status;
          order.shippedDate = status === 'Shipped' ? "2020-09-16" : undefined;
          return getRepository(Order).save(order);
        }
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
}

export default orderResolver;
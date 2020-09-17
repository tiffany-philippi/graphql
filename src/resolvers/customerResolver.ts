import { ApolloError } from "apollo-server-express";
import { getRepository } from "typeorm";
import { Customer } from "../entities/Customer";
import { Order } from "../entities/Order";

const customerResolver = {
  Customer: {
    orders: (parent: Customer) => {
      try {
        return getRepository(Order).createQueryBuilder().where("customerNumber = :customerNumber", {customerNumber: parent.customerNumber}).getMany();
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },

  Query: {
    customers: (_: any, {pageSize = 10, pageNumber = 1, orderBy = "customerName", orderDir = "ASC"}: any) => {
      //consulta dos customers no banco e devolver array
      try {
        //paginação
        return getRepository(Customer).createQueryBuilder().limit(pageSize).offset((pageNumber - 1) * pageSize).orderBy(orderBy, orderDir).getMany();
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    customer: (_: any, {id}: any) => {
      try {
        return getRepository(Customer).findOne(id);
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
}

export default customerResolver;
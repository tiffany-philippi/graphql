import { ApolloError } from "apollo-server-express";
import { getRepository } from "typeorm";
import { Customer } from "../entities/Customer";

const customerResolver = {
  Query: {
    customers: () => {
      //consulta dos customers no banco e devolver array
      try {
        return getRepository(Customer).find();
      } catch (error) {
        throw new ApolloError(error);
      }
    }
    // customer(_:any, args: any) => {

    // }
  }
}

export default customerResolver;
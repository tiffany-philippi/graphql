import testResolver from './testResolver';
import customerResolver from '../resolvers/customerResolver';
import orderResolver from '../resolvers/orderResolver';
import authResolver from './authResolver';

const resolvers = [
  testResolver,
  customerResolver,
  orderResolver,
  authResolver
];

export default resolvers;
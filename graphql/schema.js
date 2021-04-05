const {buildSchema} = require('graphql')
module.exports = buildSchema(`
  type Table {
    id: ID!
    name: String!,
    status: String!,
    count_client: Int!,
    amount_execute_order: Int!
  }
  type Order {
    id: ID!
    describe: String!,
    status: String!,
    client: Client!,
    table: Table!
  }
  type Client {
    id: ID!
    name: String!,
    table: Table!,
    orders: [Order!]!
  }
   input ParamsInput {
    type: String!
  }
  
  type Query {
    getTable(param: ParamsInput): [Table!]!,
    getClient(id: ID!): [Client!]!
  }
  
  input OrderInput {
    describe: String!,
    client: String!
  }
  
  input ClientInput {
     name: String!,
     table: String!
  }
    input TableInput {
     name: String!
  }
   input IdInput {
     id: ID!, 
     table: ID!
  }
  
  type Mutation {
    postTable(table: TableInput): Table!,
    postOrder(order: OrderInput): Order!,
    postClient(client: ClientInput): Client!,
    putOrder(id: IdInput!): Boolean!
    deleteClient(id: ID!): Boolean!
  }
`)
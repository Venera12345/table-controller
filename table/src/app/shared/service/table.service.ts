import {Injectable} from '@angular/core';
import gql from "graphql-tag";

export interface Table {
  id?: string
  name?: string
  count_client?: number
  amount_execute_order?: number
  status?: string
}

export interface Order {
  id?: string
  describe?: string
  status?: string
  client?: Client
  table?: Table
}

export interface Client {
  id?: string
  name?: string
  orders?: Order[]
  table?: Table
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  GET_TABLE = gql`
    query($type: String!) {
      getTable(param: {type: $type}) {
        id
        name
        count_client
        amount_execute_order
      }
    }`;
  GET_CLIENT = gql`
    query($id: ID!) {
      getClient(id: $id) {
        name
        id
        orders {
          id
          describe
          status
        }
      }
    }`;
  GET_CLIENT_LIST = gql`
    query($id: ID!) {
      getClient(id: $id) {
        id
        name
      }
    }`;
  DELETE_CLIENT = gql`
    mutation($id: ID!) {
      deleteClient(id: $id)
    }`;
  POST_TABLE = gql`
    mutation ($name: String!) {
      postTable(table: {name: $name}) {
        name
      }
    }`;
  POST_ORDER = gql`
    mutation ($describe: String!, $client: String!) {
      postOrder(order: {describe: $describe, client: $client}) {
        id
        describe
        status
      }
    }`;
  POST_CLIENT = gql`
    mutation ($name: String!, $table: String!) {
      postClient(client: {name: $name, table: $table}) {
        id
        name
        orders {
          id
        }
      }
    }`;
  PUT_ORDER = gql`
    mutation($id: ID!, $table: ID!) {
      putOrder(id: {id:$id, table: $table})
    }`;

  constructor() {
  }
}

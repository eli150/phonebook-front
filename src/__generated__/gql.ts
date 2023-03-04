/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation createContact($CreateContactInput: CreateContactInput!) {\n    createContact(createContactInput: $CreateContactInput) {\n      id\n    }\n  }": types.CreateContactDocument,
    "mutation updateContact($UpdateContactInput: UpdateContactInput!) {\n    updateContact(updateContactInput: $UpdateContactInput) {\n      id\n    }\n  }": types.UpdateContactDocument,
    "\n    query GetCount($searchQuery: String! = \"\") {\n        count(searchQuery: $searchQuery)\n    }\n": types.GetCountDocument,
    " query GetContacts($skip: Int!, $take: Int!, $searchQuery: String! = \"\") {\n  contacts(skip: $skip, take: $take, searchQuery: $searchQuery) {\n    id\n    firstName\n    lastName\n    nickName\n    phoneNumbers\n    address\n    photoUrl\n  }\n}": types.GetContactsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createContact($CreateContactInput: CreateContactInput!) {\n    createContact(createContactInput: $CreateContactInput) {\n      id\n    }\n  }"): (typeof documents)["mutation createContact($CreateContactInput: CreateContactInput!) {\n    createContact(createContactInput: $CreateContactInput) {\n      id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation updateContact($UpdateContactInput: UpdateContactInput!) {\n    updateContact(updateContactInput: $UpdateContactInput) {\n      id\n    }\n  }"): (typeof documents)["mutation updateContact($UpdateContactInput: UpdateContactInput!) {\n    updateContact(updateContactInput: $UpdateContactInput) {\n      id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCount($searchQuery: String! = \"\") {\n        count(searchQuery: $searchQuery)\n    }\n"): (typeof documents)["\n    query GetCount($searchQuery: String! = \"\") {\n        count(searchQuery: $searchQuery)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " query GetContacts($skip: Int!, $take: Int!, $searchQuery: String! = \"\") {\n  contacts(skip: $skip, take: $take, searchQuery: $searchQuery) {\n    id\n    firstName\n    lastName\n    nickName\n    phoneNumbers\n    address\n    photoUrl\n  }\n}"): (typeof documents)[" query GetContacts($skip: Int!, $take: Int!, $searchQuery: String! = \"\") {\n  contacts(skip: $skip, take: $take, searchQuery: $searchQuery) {\n    id\n    firstName\n    lastName\n    nickName\n    phoneNumbers\n    address\n    photoUrl\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
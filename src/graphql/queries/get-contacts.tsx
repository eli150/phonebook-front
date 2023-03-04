import { gql } from "../../__generated__";

export const GET_CONTACTS =
  gql(` query GetContacts($skip: Int!, $take: Int!, $searchQuery: String! = "") {
  contacts(skip: $skip, take: $take, searchQuery: $searchQuery) {
    id
    firstName
    lastName
    nickName
    phoneNumbers
    address
    photoUrl
  }
}`);

// export const GET_CONTACTS = ` query GetContacts($skip: Int!, $take: Int!, $searchQuery: String! = "") {
//   contacts(skip: $skip, take: $take, searchQuery: $searchQuery) {
//     id
//     firstName
//     lastName
//     nickName
//     phoneNumbers
//     address
//     photoUrl
//   }
// }`;

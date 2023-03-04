// mutation {
//     updateContact(updateContactInput: {
//       id:14,
//       nickName: "A"
//     }) {
//       id,
//       lastName,
//      phoneNumbers
//     }
//   }

import { gql } from "../../__generated__";

export const UPDATE_CONTACT =
  gql(`mutation updateContact($UpdateContactInput: UpdateContactInput!) {
    updateContact(updateContactInput: $UpdateContactInput) {
      id
    }
  }`);

// export const CREATE_CONTACT =
//   gql(`mutation createContact($CreateContactInput: CreateContactInput!) {
//   createContact(createContactInput: $CreateContactInput) {
//     id
//   }
// }`);

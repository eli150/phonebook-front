import { gql } from "../../__generated__";

export const CREATE_CONTACT =
  gql(`mutation createContact($CreateContactInput: CreateContactInput!) {
    createContact(createContactInput: $CreateContactInput) {
      id
    }
  }`);

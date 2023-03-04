import { gql } from "../../__generated__";

export const GET_CONTACTS_COUNT = gql(`
    query GetCount($searchQuery: String! = "") {
        count(searchQuery: $searchQuery)
    }
`);

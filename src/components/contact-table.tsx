import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
} from "@mui/material";
import { GET_CONTACTS } from "../graphql/queries/get-contacts";

import Popup from "reactjs-popup";
import ContactForm from "./contact-form";
import { ContactDetails } from "../types";
import { useQuery } from "@apollo/client";
import useDebounce from "../hooks/useDebounce";

const ContactTable = () => {
  const [skipContacts, setSkipContacts] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [contactsList, setContactsList] = useState<ContactDetails[]>([]);
  const [contactDetails, setContactDetails] = useState<ContactDetails>();
  const [openEdit, setOpenEdit] = useState(false);
  const closeModal = () => setOpenEdit(false);

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_CONTACTS, {
    skip: true,
  });

  useDebounce(
    () => {
      setDebouncedSearch(searchQuery);
    },
    [searchQuery],
    1000
  );

  useEffect(() => {
    console.log("debouncedSearch");
    setContactsList([]);
    setSkipContacts(0);
  }, [debouncedSearch]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchMore({
      variables: {
        skip: skipContacts,
        take: 5,
        searchQuery: debouncedSearch,
      },
    })
      .then((res) => {
        setContactsList((prevContactList) => [
          ...prevContactList,
          ...(res.data.contacts as ContactDetails[]),
        ]);
        setHasMore(res.data.contacts.length > 0);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsError(true);
      });
  }, [debouncedSearch, skipContacts]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastContactElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkipContacts((skipContacts) => skipContacts + 5);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleContactClick = (
    e: React.MouseEvent<HTMLElement>,
    contact: ContactDetails
  ) => {
    setContactDetails(contact);
    setOpenEdit((o) => !o);
  };

  return (
    <>
      <Input placeholder="Search" value={searchQuery} onChange={handleSearch} />
      <TableContainer sx={{ padding: "20px 0px 20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile Picture</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactsList.map((contact, index) => {
              const refValue =
                contactsList.length === index + 1
                  ? lastContactElementRef
                  : null;
              const contactName =
                contact.nickName === ""
                  ? `${contact.firstName} ${contact.lastName}`
                  : contact.nickName;
              return (
                <TableRow
                  key={contact.id}
                  ref={refValue}
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    handleContactClick(e, contact)
                  }
                >
                  <TableCell>
                    <img
                      src={
                        contact.photoUrl !== ""
                          ? `${contact.photoUrl}`
                          : "https://phonebook-bucket.s3.amazonaws.com/e6991c56-541b-442f-a705-040cdb6eecf5-empty-profile-picture.png"
                      }
                      alt={contact.firstName}
                      width="150px"
                      height="150px"
                    />
                  </TableCell>
                  <TableCell>{contactName}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup
        open={openEdit}
        closeOnDocumentClick
        onClose={closeModal}
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
        contentStyle={{ backgroundColor: "white", height: 700, width: 500 }}
      >
        <>
          <a
            onClick={closeModal}
            style={{ cursor: "pointer", lineHeight: "30px", fontSize: "36px" }}
          >
            &times;
          </a>
          <ContactForm contact={contactDetails} closeModal={closeModal} />
        </>
      </Popup>
      <div>{isLoading && "Loading..."}</div>
      <div>{isError && "Error..."}</div>
    </>
  );
};

export default ContactTable;

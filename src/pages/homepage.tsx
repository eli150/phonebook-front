import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import ContactForm from "../components/contact-form";
import ContactTable from "../components/contact-table";

const HomePage = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const closeModal = () => setOpenEdit(false);

  const handleCreateClick = (e: React.MouseEvent<HTMLElement>) => {
    setOpenEdit((o) => !o);
  };
  return (
    <>
      <Typography variant="h5" sx={{ paddingTop: 5, paddingBottom: 2 }}>
        Phonebook
      </Typography>
      <Button
        variant="contained"
        onClick={handleCreateClick}
        sx={{ margin: "16px", marginLeft: "0px" }}
      >
        Create Contact
      </Button>
      <Popup
        open={openEdit}
        closeOnDocumentClick
        onClose={closeModal}
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
        contentStyle={{ backgroundColor: "white", height: "55%", width: "45%" }}
      >
        <>
          <a
            onClick={closeModal}
            style={{ cursor: "pointer", lineHeight: "30px", fontSize: "36px" }}
          >
            &times;
          </a>
          <ContactForm closeModal={closeModal} />
        </>
      </Popup>
      <ContactTable />
    </>
  );
};

export default HomePage;

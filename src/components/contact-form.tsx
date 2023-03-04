import {
  FormGroup,
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { CREATE_CONTACT } from "../graphql/mutations/create-contact";
import { ContactDetails, ContactFormDetails } from "../types";
import { UPDATE_CONTACT } from "../graphql/mutations/update-contact";
import axios from "axios";
import ContactPhoneMenu from "./contact-phone-menu";

const boxStyle = {};

const formContrlStyle = {
  marginBottom: "16px",
};

const ContactForm = ({
  contact,
  closeModal,
}: {
  contact?: ContactDetails;
  closeModal: () => void;
}) => {
  const [createContact] = useMutation(CREATE_CONTACT);
  const [updateContact] = useMutation(UPDATE_CONTACT);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    const contactId = contact?.id as number;

    axios({
      url: "http://localhost:3001/upload",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) =>
        updateContact({
          variables: {
            UpdateContactInput: {
              id: contactId,
              photoUrl: res.data,
            },
          },
        })
      )
      .catch((e) => console.log(e));
  };

  const formInitalValues = contact
    ? { ...contact, phoneNumbers: "" }
    : {
        firstName: "",
        lastName: "",
        nickName: "",
        phoneNumbers: "",
        address: "",
      };

  const formText = contact ? "Update Contact" : "Create Contact";

  const formValidationSchema = Yup.object()
    .required()
    .shape({
      firstName: Yup.string().required("This fieid is required"),
      lastName: Yup.string().required("This fieid is required"),
      nickName: Yup.string(),
      phoneNumbers: Yup.string()
        .matches(/^[0-9]*$/, "Must only contain numbers")
        .required("This fieid is required"),
      address: Yup.string(),
    });

  //async
  const formSubmit = (values: ContactFormDetails) => {
    if (contact) {
      contact.phoneNumbers.push(values.phoneNumbers);
      updateContact({
        variables: {
          UpdateContactInput: {
            id: contact.id,
            firstName: values.firstName,
            lastName: values.lastName,
            nickName: values.nickName,
            phoneNumbers: contact.phoneNumbers,
            address: values.address,
          },
        },
      });
    } else {
      createContact({
        variables: {
          CreateContactInput: {
            firstName: values.firstName,
            lastName: values.lastName,
            nickName: values.nickName,
            phoneNumbers: [values.phoneNumbers],
            address: values.address,
            photoUrl: "",
          },
        },
      });
    }
    closeModal();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      {contact ? (
        <div style={{ paddingLeft: "80%" }}>
          <ContactPhoneMenu contact={contact} />
        </div>
      ) : (
        <div></div>
      )}
      <Typography variant="h6" sx={{ paddingBottom: 5 }}>
        {formText}
      </Typography>

      <Formik
        initialValues={formInitalValues}
        validationSchema={formValidationSchema}
        onSubmit={formSubmit}
        isInitialValid={contact ? true : false}
      >
        {(formikProps: FormikProps<ContactFormDetails>) => {
          const { handleBlur, errors, touched, handleChange, isValid, values } =
            formikProps;

          return (
            <Form>
              <FormGroup>
                <FormControl sx={formContrlStyle}>
                  <TextField
                    name="firstName"
                    label="Firstname"
                    value={values.firstName}
                    required
                    onChange={handleChange}
                    {...(!!errors.firstName &&
                      touched.firstName && {
                        helperText: errors.firstName,
                      })}
                    error={!!errors.firstName && touched.firstName}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <FormControl sx={formContrlStyle}>
                  <TextField
                    name="lastName"
                    label="Lastname"
                    value={values.lastName}
                    required
                    onChange={handleChange}
                    error={!!errors.lastName && touched.lastName}
                    {...(!!errors.lastName &&
                      touched.lastName && {
                        helperText: errors.lastName,
                      })}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <FormControl sx={formContrlStyle}>
                  <TextField
                    name="nickName"
                    label="Nickname"
                    value={values.nickName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={formContrlStyle}>
                  <TextField
                    name="phoneNumbers"
                    label="Phone"
                    value={values.phoneNumbers}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={formContrlStyle}>
                  <TextField
                    value={values.address}
                    name="address"
                    label="Address"
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  disabled={!isValid}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {formText}
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
      {contact ? (
        <Button
          variant="contained"
          component="label"
          color="secondary"
          sx={{ marginTop: "16px" }}
        >
          Upload Photo
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleFileUpload}
          />
        </Button>
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default ContactForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";
// Material Core Components
import {
  Card,
  Avatar,
  Dialog,
  DialogTitle,
  Slide,
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
// core components
import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
// Core Components
import CustomerDetails from "components/UserHelpers/CustomerDetails.js";
import PasswordChange from "components/Access/PasswordChange.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import LoadSpinner from "components/Loader/LoadSpinner";
import ProfileCardDetails from "components/ProfilePage/ProfileCardDetails.js";
import ProfileBodyDetails from "components/ProfilePage/ProfileBodyDetails.js";
import Footer from "components/Home/Footer.js";
import { DropzoneDialog } from "material-ui-dropzone";
// Material Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// SVG
import profileSVG from "assets/svg/profile/profile.svg";
// IMG
import backgroundIMG from "assets/image/prudentialBackground.png";
// Helper Files
import { convertDate } from "helper/DateConverter.js";
// Style Jss
import styles from "assets/jss/material-kit-react/views/profilePage.js";
// Images
import profile from "assets/image/profile/customerProfile.jpg";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile(props) {
  const history = useHistory();
  const classes = useStyles();
  const { ...rest } = props;
  //Local Storage
  const storedData = JSON.parse(localStorage.getItem("custData"));
  //Customer Data Fetched From Backend
  const [fetchedData, setFetchedData] = useState(null);
  const [fetchedDependents, setFetchedDependents] = useState(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);
  //Dialog and Alert Logic
  const [openPw, setOpenPw] = useState(false);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [editable, setEditable] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);
  const [profilePicture, setProfilePicture] = useState(true);
  const [dependentPicture, setDependentPicture] = useState(true);
  const [picture, setPictures] = React.useState([]);
  const handleUploadOpen = () => {
    setOpenUpload(true);
  };
  const handleUploadClose = () => {
    setOpenUpload(false);
  };
  const handleImageSave = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const res = await axios.post(
        `/customerProfileAPI/uploadNewProfilePic/${storedData.custId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const openPwDialog = () => {
    setOpenPw(true);
  };

  const closePwDialog = () => {
    setOpenPw(false);
  };

  const openUpdate = () => {
    setUpdate(true);
  };

  const closeUpdate = () => {
    setUpdate(false);
  };

  const openAlert = () => {
    setAlert(true);
  };

  const closeAlert = () => {
    setAlert(false);
  };

  const openUpdateAlert = () => {
    setUpdateAlert(true);
  };

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  const getDependentPic = (dependentID) => {
    axios
      .get(`/customerProfileAPI/getProfilePic/${dependentID}`)
      .then((receivedProfilePic) => {
        setPictures((picture) => picture.concat(receivedProfilePic.data));
      });
  };

  const getCustomerPic = (customerID) => {
    axios
      .get(`/customerProfileAPI/getProfilePic/${customerID}`)
      .then((receivedProfilePic) => {
        setProfilePicture(receivedProfilePic.data);
      });
  };

  useEffect(() => {
    console.log("HISTORY >> ", history);
    // console.log("Fetching Customer Details");
    axios
      .all([
        axios.get(`/customerProfileAPI/getMyProfile/${storedData.custId}`),
        axios.get(`/customerProfileAPI/getMyDependents/${storedData.custId}`),
      ])
      .then(
        axios.spread((customer, dependents) => {
          console.log("CUSTOMER FETCHED >>>> ", customer.data);
          console.log("DEPENDENTS METHODS FETCHED >>>> ", dependents.data);
          customer.data.dob = customer.data.dob.slice(0, 10);
          getCustomerPic(storedData.custId);
          dependents.data.forEach(function (dependent) {
            getDependentPic(dependent.id);
          });
          setFetchedData(customer.data);
          setFetchedDependents(dependents.data);
          setLoad(true);
        })
      )
      .catch((err) => {
        setError(err.message);
        setLoad(true);
      });
  }, [counter]);

  if (load) {
    return (
      <div>
        {error ? (
          <li>{error.message}</li>
        ) : (
          <div>
            <Header
              fixed
              color="transparent"
              changeColorOnScroll={{
                height: 200,
                color: "white",
              }}
              isDisappear
              caller="customer"
              brand="Pruaffinity"
              url="/"
              {...rest}
            />
            <Parallax
              small
              filter
              image={require("assets/image/home/banner/banner.jpg")}
            />
            <div
              className={classes.main}
              style={{
                backgroundImage: `url(${backgroundIMG})`,
                backgroundSize: "cover",
                overflowX: "hidden",
              }}
            >
              <div className={classes.container}>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    className={classes.navWrapper}
                  >
                    <Box boxShadow={3}>
                      <Card style={{ background: "#EFFBFE" }}>
                        <Avatar
                          src={profilePicture}
                          className={classes.profilePhoto}
                        />
                        <Button
                          className={classNames(
                            classes.profileUpdateBtn,
                            classes.profileBtnHover
                          )}
                          onClick={handleUploadOpen}
                        >
                          Edit Picture
                        </Button>
                        <DropzoneDialog
                          open={openUpload}
                          onSave={handleImageSave}
                          acceptedFiles={["image/*"]}
                          showPreviews={true}
                          maxFileSize={5000000}
                          onClose={handleUploadClose}
                          showAlerts={true}
                        />
                        <Divider variant="middle" className={classes.divider} />
                        <ProfileCardDetails customer={fetchedData} />
                      </Card>
                    </Box>
                  </GridItem>
                  <GridItem
                    xs={8}
                    sm={8}
                    md={6}
                    lg={6}
                    className={classes.navWrapper}
                  >
                    <ProfileBodyDetails
                      customer={fetchedData}
                      dependents={fetchedDependents}
                      pictures={picture}
                      openPwDialog={openPwDialog}
                      openUpdate={openUpdate}
                      counter={counter}
                      setCounter={setCounter}
                    />
                  </GridItem>
                  <GridItem
                    xs={4}
                    sm={4}
                    md={2}
                    lg={2}
                    className={classes.navWrapper}
                  >
                    <IconButton
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <div>
                      <img
                        src={profileSVG}
                        height="300"
                        width="300"
                        style={{
                          position: "absolute",
                          right: "90px",
                          top: "100px",
                          opacity: 0.2,
                        }}
                      />
                    </div>
                  </GridItem>
                </GridContainer>

                {/* PASSWORD CHANGE */}
                <Dialog
                  onClose={closePwDialog}
                  aria-labelledby="customized-dialog-title"
                  open={openPw}
                  maxWidth="sm"
                  fullWidth
                >
                  <PasswordChange
                    handleClose={closePwDialog}
                    handleOpen={openPwDialog}
                    openAlert={openAlert}
                  />
                </Dialog>

                {/* UPDATE DETAILS */}
                <Dialog
                  TransitionComponent={Transition}
                  onClose={closeUpdate}
                  aria-labelledby="customized-dialog-title"
                  open={update}
                  fullWidth
                  maxWidth="md"
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <CustomerDetails
                    isUpdate
                    counter={counter}
                    setCounter={setCounter}
                    profileCustData={fetchedData}
                    setProfileCustData={setFetchedData}
                    handleClose={closeUpdate}
                  />
                </Dialog>
              </div>
              <Footer />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <LoadSpinner />;
  }
}

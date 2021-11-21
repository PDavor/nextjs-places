import React, { useState } from "react";
import Image from "next/image";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlaceIcon from "@mui/icons-material/Place";
import AddIcon from "@mui/icons-material/Add";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Typography } from "@mui/material";
const drawerWidth = 240;

import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

import { MongoClient } from "mongodb";
import Head from "next/head";
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  width: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  bgcolor: "background.paper",
  p: 2,
  px: 4,
  pb: 3,
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  p: 1,
  m: 1,
  bgcolor: "background.paper",
};

export default function PermanentDrawerLeft({ places }) {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const handleFormClose = () => {
    setFormOpen(false);
  };

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState({});
  const handleModalData = ({ title, image, description }) => {
    setModalData({ title, image, description });
    handleOpen();
  };
  const [sendData, setSendData] = useState({});

  const addPlace = async () => {
    const data = {
      name: name,
      image: image,
      description: description,
    };
    try {
      console.log("sendada", data);
      console.log("name", name);
      console.log("image", image);
      console.log("description", description);

      const response = await fetch("/api/new-place", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Error 1:", error);
    }
  };
  return (
    <React.Fragment>
      <Head>
        <title>Places</title>
      </Head>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* ---------------------------- CUSTOM PLACE MODAL -------------------------------------*/}
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
        >
          <Box sx={style}>
            <h2 id="unstyled-modal-title">{modalData.title}</h2>
            <Box sx={{ justifyContent: "center" }}>
              <Image
                src={modalData.image}
                alt={modalData.title}
                loading="lazy"
                width="600"
                height="400"
              />
              <Typography paragraph={true}>{modalData.description}</Typography>
            </Box>
            <Toolbar />
          </Box>
        </StyledModal>
        {/* ---------------------------- CUSTOM PLACE MODAL -------------------------------------*/}
        {/* ---------------------------- CUSTOM FORM MODAL -------------------------------------*/}
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={formOpen}
          onClose={handleFormClose}
          BackdropComponent={Backdrop}
        >
          <Box sx={style}>
            <h2 id="unstyled-modal-title">Add New Place</h2>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              id="outlined-basic"
              label="Image"
              variant="outlined"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              sx={{ m: 1 }}
            />
            <Button variant="outlined" onClick={() => addPlace()}>
              Outlined
            </Button>
          </Box>
        </StyledModal>
        {/* ---------------------------- CUSTOM FORM MODAL -------------------------------------*/}
        {/* ---------------------------- SIDEBAR -------------------------------------*/}
        <Drawer
          sx={{
            width: drawerWidth,
            pt: 3,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
            <ListItem button>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary="Visited Places" />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText
                primary="Add New Place"
                onClick={() => setFormOpen(true)}
              />
            </ListItem>
          </List>
        </Drawer>
        {/* ---------------------------- SIDEBAR -------------------------------------*/}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", mx: 10 }}
        >
          <Toolbar />
          <ImageList cols={2}>
            {places.map((item) => (
              <ImageListItem
                key={item.id}
                onClick={() =>
                  handleModalData({
                    title: item.name,
                    image: item.img,
                    description: item.description,
                  })
                }
                sx={{ cursor: "pointer", m: 1 }}
              >
                <Image
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <ImageListItemBar title={item.name} position="below" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://pdavor:pdavor123@cluster0.2nd8w.mongodb.net/places?retryWrites=true&w=majority"
  );
  const db = client.db();
  const placesCollection = db.collection("places");

  const places = await placesCollection.find().toArray();
  const data = JSON.stringify(places);
  client.close();
  return {
    props: {
      places: places.map((place) => ({
        name: place.name,
        img: place.image,
        description: place.description,
        id: place._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

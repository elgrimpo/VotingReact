// React/Redux Imports
import React, { useEffect, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useSnackbar } from "notistack";

// MUI Imports
import {
  Fab,
  Box,
  Typography,
  Dialog,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';

// App Imports
import {
  CommunityCard,
} from "../index.js";
import { lightTheme } from "../../styles/themeProvider";
import * as api from "../../api";

/* ----------- COMPONENT -------------- */

export default NiceModal.create((props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const modal = useModal();

  // API's

  // Variable
  const [communities, setCommunities] = useState([{}]);

  // Functions
  useEffect(async () => {
    let isLoaded = false;
    if (!isLoaded) {
      try {
        await api
          .fetchAllCommunities()
          .then((response) => setCommunities(response.data))
          .then((isLoaded = true));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <Dialog
        style={{
          width: "100%",
          backgroundColor: "#F8F8F8",
        }}
        onClose={() => modal.remove()}
        open={modal.visible}
        fullScreen="false"
        maxWidth="lg"
      >
        <Fab
          id="menu-button"
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => modal.remove()}
        >
          <CloseIcon />
        </Fab>
        {/* ---> Title <--- */}
        <Box
          sx={{ maxWidth: { lg: "1000px" } }}
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            margin: "80px auto 20px auto",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            style={{ color: "black", marginTop: "80px" }}
          >
            Explore Communities
          </Typography>
        </Box>

        {/* ---> Initiative tiles <--- */}
        <Box id="initiatives-grid" sx={{ maxWidth: { lg: "1000px" } }}>
          {communities.map((community, index) => (
            <CommunityCard
              key={`${index} ${community._id}`}
              community={community}
            >
              {community.name}
            </CommunityCard>
          ))}
        </Box>
      </Dialog>
    </ThemeProvider>
  );
});

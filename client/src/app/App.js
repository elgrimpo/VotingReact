//React Imports
import "../styles/App.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


//MUI Imports
import {
  Box,
  Paper,
  Drawer,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

//App Imports
import {
  Communities,
  InitiativesList,
  InitiativeDetails,
  MainNav,
  Sidebar,
} from "../components";
import { fetchInitiatives } from "../store/initiatives/initiativesSlice";
import { selectGroupInitiatives, selectInitiativeLoadingStatus, removeCurrentInitiativeSelection } from '../store/initiatives/initiativesSlice'
import { lightTheme } from "../styles/themeProvider";

/* ----------- COMPONENT -------------- */

function App(props) {
  // Drawer functions
  const drawer = (
    <Box style={{ display: "flex", height: "100%", width: "100%" }}>
      <Communities />
      <MainNav />
    </Box>
  );
  const { window } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const container =
  window !== undefined ? () => window().document.body : undefined;
  
  const dispatch = useDispatch()
  const initiativeStatus = useSelector(selectInitiativeLoadingStatus)  
  
  useEffect(() => {
    dispatch(fetchInitiatives())
  }, [dispatch])

  // Check if data is fetched from database
  let isLoading = true
  if (initiativeStatus !== 'success') {
    isLoading = true
  } else {
    isLoading = false
  }



  
  return (
  isLoading ? ( <Box></Box> ) :
    (
      <Box
        style={{
          height: "100%",
          width: "100%",
          background: "linear-gradient(175deg, #2C7772 30%, #264F60 90%)",
        }}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            lg: "380px 1fr 320px",
            md: "1fr 320px",
            sm: "1fr",
          },
        }}
      >
        
        {/* ---> Navigation <--- */}

        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            height: "100%",
            "& .MuiDrawer-paper": { backgroundColor: "#2C7772" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            height: "100%",
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",

              backgroundColor: "transparent",
            },
          }}
          open
        >
          {drawer}
        </Drawer>

        {/* ---> Main Content <--- */}

        <ThemeProvider theme={lightTheme}>
          <Paper
            elevation={5}
            style={{
              height: "100%",
              background: "white",
              borderRadius: 0,
            }}
            sx={{ overflow: { sm: "visible", md: "scroll", lg: "scroll" } }}
          >
            <Routes>
            <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Navigate to="/groups/0" /> 
                    )
                }}
              />
              <Route
                path="/groups/:groupId"
                element={
                  <InitiativesList handleDrawerToggle={handleDrawerToggle} />
                }
              />
              <Route
                path="/initiatives/:initiativeId"
                element={
                  <InitiativeDetails handleDrawerToggle={handleDrawerToggle} />
                }
              />
            </Routes>
          </Paper>
        </ThemeProvider>

        {/* ---> Sidebar <--- */}

        <Box>
          <Sidebar />
        </Box>
      </Box>
      )
  )
}

export default App;

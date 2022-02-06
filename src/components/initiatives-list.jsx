//React Imports
import React, { useContext } from "react";

// MUI Imports
import { Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

//App Imports
import { DataContext } from "../contexts/data-context";
import { InitiativeCard } from "./index";

/* ----------- COMPONENT -------------- */

const InitiativesList = (props) => {
  const { currentGroup, initiatives } = useContext(DataContext);

  return (
    <div>
      <Fab
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={props.handleDrawerToggle}
        sx={{
          mr: 2,
          display: { lg: "none" },
          position: "fixed",
          top: "16px",
          left: "16px",
        }}
      >
        <MenuIcon />
      </Fab>

      {/* ---> Image <--- */}

      <img
        src={currentGroup.image}
        alt={currentGroup.title}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
        }}
      />

      {/* ---> Initiative tiles <--- */}

      <Grid
        sx={{
          flexGrow: 1,
          padding: "20px",
        }}
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
      >
        {initiatives.map((initiative) => (
          <InitiativeCard initiative={initiative} />
        ))}
      </Grid>

      {/* ---> Floating button <--- */}

      <Fab
        color="primary"
        style={{ position: "absolute", bottom: 40, right: 40 }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default InitiativesList;

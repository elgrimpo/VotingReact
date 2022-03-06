//React Imports
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


//MUI Imports
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  CardActions,
  Grid,
  Button,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

//App Imports
import {VoteControl} from '../index'
import { selectCurrentInitiative, selectGroupInitiatives, setCurrentInitiative  } from '../../reducers/initiativesSlice'



/* ----------- COMPONENT -------------- */

const InitiativeCard = (props) => {

  const groupInitiatives = useSelector(selectGroupInitiatives);
  const currentInitiative = useSelector(selectCurrentInitiative)
  const dispatch = useDispatch()


  function handleListItemClick(id) {
    dispatch(setCurrentInitiative(id));
  }

  return (
    <Grid item key={props.initiative._id} 
 
  >
      
        <Card
          style={{ paddingBottom: 10}}
          
        >
          <Link
        to={`/phoenix/group/621f01df4fb8bd2e064e14f0/initiative/${props.initiative._id}`} //to be updated
        style={{ textDecoration: "none", color: 'inherit' }}
        onClick={() => {
          handleListItemClick(props.initiative._id);
        }}
      >
          <CardActionArea >
            <CardMedia
              component="img"
              height="140"
              image={props.initiative.image}
            />
            <CardContent >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                {props.initiative.title}
              </Typography>
              <Typography
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {props.initiative.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          </Link>
          <CardActions
            style={{ display: "flex", justifyContent: "center" }}
          >
            <VoteControl initiative={props.initiative}/>
          </CardActions>
        </Card>
      
    </Grid>
  );
};

export default InitiativeCard;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { useState } from "react";
import AddLikeFood from "./Like/AddLikeFood";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ByNameDisplay = (props) => {
  const classes = useStyles();
  const foodByName = props.results.foodByName;
  const [activeRestaurant, setActiveRestraurant] = useState(null);
  const [open, setOpen] = React.useState(false);

  const displayFoodByName = () => {
    if (foodByName.length > 0) {
      return foodByName.map((restaurant, index) => (
        <div key={index}>
          <h1>{props.handleString(restaurant.name)}</h1>
          <div>{addLikeDisplay(restaurant)}</div>
          <div>
            <p>Total Like: {restaurant.likes.length}</p>
          </div>
        </div>
      ));
    } else {
      return (
        <div>
          <h1>Sorry No Restaurants</h1>
        </div>
      );
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const addLikeDisplay =(restaurant)=> {
      // console.log('restaurant!:', restaurant)
      if (localStorage.getItem('role') === 'user' || localStorage.getItem('role') === 'admin') {
        const activeUserLikes = restaurant.likes.find(({userId})=> JSON.stringify(userId) === localStorage.getItem('userId'));
        return restaurant.likes.length > 0 && activeUserLikes ?
          <div><StarIcon /></div>:
            <div>
              <Button onClick={()=> {
              setActiveRestraurant(restaurant);
              handleOpen();
            }}>Like</Button>
            </div>
      } else {
        return null
      }
    }

  const handleMyLikes =()=>{
    return props.token === null ?
      null
        :
        <div>
          <Link to='/userlikes'>My Likes</Link>
        </div>
  }

  const addLikeModal = () => {
    if (activeRestaurant !== null) {
      return (
        <Modal open={open} onClose={handleClose}>
          <div className={classes.paper}>
            <h1>{props.handleString(activeRestaurant.name)}</h1>
            <AddLikeFood
              handleClose={handleClose}
              searchFoodByName={props.searchFoodByName}
              activeRestaurant={activeRestaurant}
              token={props.token}
            />
          </div>
        </Modal>
      );
    } else {
      return;
    }
  };

  return (
    <div>
      <div>
        <Button onClick={()=>props.setResults(null)}>Search New Name</Button>
      </div>
        {handleMyLikes()}
      <div>
        {displayFoodByName()}
      </div>
      <div>
        {addLikeModal()}
      </div>
    </div>
  );
};

export default ByNameDisplay;

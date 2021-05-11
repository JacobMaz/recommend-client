import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddFollow from "./AddFollow";

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

const FollowDisplay = (props) => {
  const classes = useStyles();
  const userStuff = props.results.userStuff;
  const [activeUser, setActiveUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  console.log('USER!!!:', userStuff)

  const displayFollow = () => {
    if (userStuff !== null) {
      return (
        <div>
          <h2>Username: {userStuff.username}</h2>
          {followDisplay(userStuff)}
        </div>
      );
    } else {
      return (
        <div>
          <h1>Sorry No User with the Username {props.username} found</h1>
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

  const followDisplay =(userStuff)=> {
    console.log('followed user id', userStuff.followed)
    if (localStorage.getItem('role') === 'user' || localStorage.getItem('role') === 'admin') {
      const userFollowing = userStuff.followed.find(({id})=> JSON.stringify(id) === localStorage.getItem('userId'));
      return userStuff.followed.length > 0 && userFollowing ?
        <h3>Following</h3>
          :
            <Button onClick={()=> {
              setActiveUser(userStuff)
              handleOpen();
            }}>Follow</Button>
    } else {
      return null
    }
  }

  const followModal = () => {
    if (activeUser !== null) {
      return (
        <Modal open={open} onClose={handleClose}>
          <div className={classes.paper}>
            <h1>Follow {userStuff.username}?</h1>
            <AddFollow
              searchUsername={props.searchUsername}
              activeUser={activeUser}
              handleClose={handleClose}
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
        <Button onClick={() => props.setResults(null)}>Search New User</Button>
      </div>
      <h3>future link to followed users</h3>
      <div>{displayFollow()}</div>
      <div>{followModal()}</div>
    </div>
  );
};

export default FollowDisplay;

import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core";
import { useState } from "react";
import DeleteLike from "./DeleteLike";

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

const UserLikesDisplay = (props) => {
  const classes = useStyles();
  console.log("ACTiVEUsrLikes:", props.activeUserLikes.userLikes);
  const userLikes = props.activeUserLikes.userLikes;
  const [userLikeToDelete, setUserLikeToDelete] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const displayUserLike = () => {
    console.log("skillidy doo:", userLikes);
    if (userLikes === undefined || userLikes === null) {
      return null;
    } else {
      return userLikes.map((like, index) => (
        <div key={index}>
          <h2>{like.food.name}</h2>
          <Button
            onClick={() => {
              setUserLikeToDelete(like);
              handleDeleteOpen();
            }}
          >
            unlike
          </Button>
        </div>
      ));
    }
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const deleteModel = () => {
    if (userLikeToDelete !== null) {
      return (
        <Modal open={deleteOpen} onClose={handleDeleteClose}>
          <div className={classes.paper}>
            <h1>Delete Like</h1>
            <DeleteLike
              getUserLikes={props.getUserLikes}
              handleDeleteClose={handleDeleteClose}
              userLikeToDelete={userLikeToDelete}
              token={props.token}
            />
          </div>
        </Modal>
      );
    }
  };

  console.log("DELETE:", userLikeToDelete);

  return (
    <div>
      <div>{displayUserLike()}</div>
      <div>{deleteModel()}</div>
    </div>
  );
};

export default UserLikesDisplay;

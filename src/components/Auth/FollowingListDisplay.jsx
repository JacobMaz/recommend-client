import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core";
import { useState } from "react";
import Unfollow from "./Unfollow";

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

const FollowingListDisplay = (props) => {
  const classes = useStyles();
  const [userToUnfollow, setUserToUnfollow] = useState(null);
  const [unfollowOpen, setUnfollowOpen] = useState(false);

  const displayUsersFollowing = () => {
    if (props.userFollowing === undefined || props.userFollowing === null) {
      return null;
    } else {
      return props.userFollowing.map((user, index) => (
        <div key={index}>
          <h2>{user.username}</h2>
          <Button
            onClick={() => {
              setUserToUnfollow(user);
              handleUnfollowOpen();
            }}
          >
            Unfollow
          </Button>
        </div>
      ));
    }
  };

  const handleUnfollowOpen = () => {
    setUnfollowOpen(true);
  };

  const handleUnfollowClose = () => {
    setUnfollowOpen(false);
  };

  const unfollowModel = () => {
    if (userToUnfollow !== null) {
      return (
        <Modal open={unfollowOpen} onClose={handleUnfollowClose}>
          <div className={classes.paper}>
            <h1>Unfollow</h1>
            <Unfollow
              getFollowing={props.getFollowing}
              handleUnfollowClose={handleUnfollowClose}
              userToUnfollow={userToUnfollow}
              token={props.token}
            />
          </div>
        </Modal>
      );
    }
  };

  return (
    <div>
      <h1>Users I am following</h1>
      <div>{displayUsersFollowing()}</div>
      <div>{unfollowModel()}</div>
    </div>
  );
};

export default FollowingListDisplay;

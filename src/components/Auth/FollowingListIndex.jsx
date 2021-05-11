import { useEffect, useState } from "react";
import FollowingListDisplay from "./FollowingListDisplay";

const FollowingListIndex = (props) => {
  const [userFollowing, setUserFollowing] = useState(null);

  const getFollowing = () => {
    fetch("http://localhost:3003/user/userinfo", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
          setUserFollowing(data.userInfo.User)
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getFollowing();
  }, []);
  console.log('Following:', userFollowing)

  const handleUserFollowingDisplay = () => {
    if (userFollowing === null) {
      return null;
    } else {
      return userFollowing.length > 0 ? (
          <FollowingListDisplay userFollowing={userFollowing} getFollowing={getFollowing} token={props.token} />
      ) : (
        <div>
          <h1>No Users Followed </h1>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Following List</h1>
      <div>{handleUserFollowingDisplay()}</div>
    </div>
  );
};

export default FollowingListIndex;

import { useEffect, useState } from "react";
import UserProfileDisplay from "./UserProfileDisplay";
import { Button } from "@material-ui/core";
import UpdateUserinfo from "./UpdateUserinfo";

const UserProfileIndex = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userUpdateActive, setUserUpdateActive] = useState(false);

  const getUserInfo = () => {
    fetch("http://localhost:3003/user/userinfo", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  console.log("userInfo:", userInfo);

  const handleUserInfoDisplay = () => {
    if (userInfo === null || userInfo === undefined) {
      return null;
    } else {
      if (userUpdateActive === false) {
        return (
          <div>
            <Button onClick={() => setUserUpdateActive(true)}>Update</Button>
            <h1>INFO HERE</h1>
            <UserProfileDisplay userInfo={userInfo} handleString={props.handleString} />
          </div>
        );
      } else {
        return (
          <div>
            <h1>Updating....</h1>
            <UpdateUserinfo
              handleString={props.handleString}
              userInfo={userInfo}
              setUserUpdateActive={setUserUpdateActive}
              token={props.token}
            />
          </div>
        );
      }
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div>{handleUserInfoDisplay()}</div>
    </div>
  );
};

export default UserProfileIndex;

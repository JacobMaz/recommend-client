
const UserProfileDisplay = (props) => {
    console.log('hi',props.userInfo.userInfo)
    const userInfo = props.userInfo.userInfo

  return (
    <div>
        <h3>Username: {userInfo.username}</h3>
        <h3>Email: {userInfo.email}</h3>
    </div>
  );
};

export default UserProfileDisplay;

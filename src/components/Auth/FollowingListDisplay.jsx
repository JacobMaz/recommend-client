

const FollowingListDisplay = (props) => {

    const displayUsersFollowing = () => {
        if (props.userFollowing === undefined || props.userFollowing === null) {
          return null;
        } else {
          return props.userFollowing.map((user, index) => (
            <div key={index}>
              <h2>{user.username}</h2>
            </div>
          ));
        }
      };

  return (
    <div>
        <h1>Users I am following</h1>
        <div>
            {displayUsersFollowing()}
        </div>
    </div>
  );
};

export default FollowingListDisplay;

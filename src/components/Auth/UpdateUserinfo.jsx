import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const UpdateUserinfo = (props) => {
  const [email, setEmail] = useState(props.userInfo.userInfo.email);
  const [username, setUsername] = useState(props.userInfo.userInfo.username);
  const [updateRedirect, setUpdatedRedirect] = useState('')

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch("http://localhost:3003/user/updateuserinfo", {
      method: "PUT",
      body: JSON.stringify({
        email: email.toLocaleLowerCase(),
        username: username.toLocaleLowerCase().replace(/ /g, "_"),
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status === 'success'){
          setUpdatedRedirect('/updatesuccess')
        } else {
          console.log('Failed To Update')
        }
      })
      .catch((error) => console.log(error));
  };

  if (updateRedirect === '/updatesuccess') {
    return <Redirect to={updateRedirect} />
  }

  return (
    <div>
      <h1>Update User Info</h1>
      <form onSubmit={handleUpdate}>
        <h2>Username: </h2>
        <TextField
          required
          variant="outlined"
          value={props.handleString(username)}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h2>Email: </h2>
        <TextField
          required
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
};

export default UpdateUserinfo;

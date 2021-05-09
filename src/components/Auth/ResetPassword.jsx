import { Button, TextField } from "@material-ui/core";
import { useState} from "react";
import { Redirect, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [takeMeHome, setTakeMeHome] = useState("");
  const {token} = useParams()
  console.log(token)

  const resetPassword = (e) => {
    e.preventDefault();
    if (passwordOne === passwordTwo) {
      fetch("http://localhost:3003/user/newpassword", {
        method: "POST",
        body: JSON.stringify({
          password: passwordOne,
          resetToken: token
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Data', data);
          if (data.status === "sent") {
            setTakeMeHome("/");
            console.log('Password Changed')
          } else {
            console.log("Password Not Changed");
          }
        });
    } else {
      console.log("ERROR: Password Does Not Match!");
    }
  };

  if (takeMeHome) {
    return <Redirect to={takeMeHome} />;
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={resetPassword}>
        <TextField
          required
          type="password"
          label="Password"
          variant="outlined"
          onChange={(e) => setPasswordOne(e.target.value)}
        />
        <TextField
          required
          type="password"
          label="Confirm Password"
          variant="outlined"
          onChange={(e) => setPasswordTwo(e.target.value)}
        />
        <Button type="submit">Update Password</Button>
      </form>
    </div>
  );
};

export default ResetPassword;

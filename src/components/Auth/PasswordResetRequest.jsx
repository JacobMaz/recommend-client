import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [takeMeHome, setTakeMeHome] = useState('');

  const requestReset = (e) => {
    e.preventDefault();
    fetch("http://localhost:3003/user/resetpassword", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status==='sent'){
            setTakeMeHome("/");
        } else {
            console.log('Request Could Not be Made')
        }
      });
  };

  if (takeMeHome){
    return <Redirect to={takeMeHome}/>
  }

  return (
    <div>
      <h1>Request Password Reset</h1>
      <form onSubmit={requestReset}>
        <TextField
          required
          type="email"
          label="Email"
          variant="outlined"
          onChange={(e) => (
            setEmail(e.target.value)
          )}
        />
        <Button type="submit">Request Reset</Button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
import { useState } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Redirect } from "react-router-dom";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [paswordTwo, setPasswordTwo] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [successRedirect, setSuccessRedirect] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordOne === paswordTwo) {
      fetch("http://localhost:3003/user/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username,
          password: passwordOne,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data: ", data);
          setSnackbarOpen(true);
          setAlertStatus(data.status);
          setAlertMessage(data.message);
          if (data.status === 'success') {
            props.updateToken(data.sessionToken);
            props.updateRole(data.user.role);
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('userId', data.user.id);
            setSuccessRedirect("/");
          } else {
            console.log('Failed to Sign Up!')
          }
        });
    } else {
      console.log("ERROR: Password Does Not Match!");
    }
  };

  const snackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAlert = () => {
    return alertStatus !== null ? (
      <Alert onClose={snackbarClose} severity={alertStatus}>
        {alertMessage}
      </Alert>
    ) : (
      <div>Alert!</div>
    );
  };

  if (successRedirect){
    return <Redirect to={successRedirect}/>
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          type="email"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Button type="submit">Sign Up</Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={snackbarClose}
      >
        {handleAlert()}
      </Snackbar>
    </div>
  );
};

export default Signup;

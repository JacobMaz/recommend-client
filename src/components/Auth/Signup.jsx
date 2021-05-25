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
  const [meetRequirements, setMeetRequirements] = useState(false);
  const [passBorder, setPassBorder] = useState("secondary");

  const passwordRequirement = (pass) => {
    if (
      pass.match(/[a-z]/g) &&
      pass.match(/[A-Z]/g) &&
      pass.match(/[0-9]/g) &&
      pass.match(/[^a-zA-z\d]/g) &&
      pass.length >= 8
    ) {
      setPassBorder("primary");
      setMeetRequirements(true);
    } else {
      setPassBorder("secondary");
      setMeetRequirements(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (meetRequirements === true) {
      if (passwordOne === paswordTwo) {
        fetch("http://localhost:3003/user/register", {
          method: "POST",
          body: JSON.stringify({
            email: email.toLocaleLowerCase(),
            username: username.toLocaleLowerCase().replace(/ /g, "_"),
            password: passwordOne,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setSnackbarOpen(true);
            setAlertStatus(data.status);
            setAlertMessage(data.message);
            if (data.status === "success") {
              props.updateToken(data.sessionToken);
              props.updateRole(data.user.role);
              localStorage.setItem("username", data.user.username);
              localStorage.setItem("userId", data.user.id);
              setSuccessRedirect("/");
            } else {
              setSnackbarOpen(true);
              setAlertStatus("error");
              setAlertMessage("Failed To Sign Up!");
            }
          });
      } else {
        setSnackbarOpen(true);
        setAlertStatus("error");
        setAlertMessage("Passwords Do Not Match!");
      }
    } else {
      setSnackbarOpen(true);
      setAlertStatus("error");
      setAlertMessage(passReq);
    }
  };

  const passReq = (
    <div>
      <p>Password Requirements Not Met!</p>
      <p>*min 1 lowercare a-z</p>
      <p>*min 1 uppercase A-Z</p>
      <p>*min 1 number 0-9</p>
      <p>*min 1 special character</p>
    </div>
  );

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

  if (successRedirect) {
    return <Redirect to={successRedirect} />;
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
          color={passBorder}
          required
          type="password"
          label="Password"
          variant="outlined"
          onChange={(e) => {
            setPasswordOne(e.target.value);
            passwordRequirement(e.target.value);
          }}
        />
        <p>{}</p>
        <TextField
          required
          type="password"
          label="Confirm Password"
          variant="outlined"
          onChange={(e) => {
            setPasswordTwo(e.target.value);
          }}
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

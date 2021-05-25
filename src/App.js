import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FollowingListIndex from "./components/Auth/FollowingListIndex";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import PasswordResetRequest from "./components/Auth/PasswordResetRequest";
import ResetPassword from "./components/Auth/ResetPassword";
import Signup from "./components/Auth/Signup";
import UpdateSuccess from "./components/Auth/UpdateSuccess";
import UserProfileIndex from "./components/Auth/UserProfileIndex";
import FollowIndex from "./components/Follow/FollowIndex";
import ByCityIndex from "./components/Food/ByCityIndex";
import ByCuisineIndex from "./components/Food/ByCuisineIndex";
import ByNameIndex from "./components/Food/ByNameIndex";
import UserLikesIndex from "./components/Food/UserLikesIndex";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import "./css/app.css";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("role")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const updateRole = (newRole) => {
    localStorage.setItem("role", newRole);
  };

  const clearToken = () => {
    localStorage.clear();
    setToken(null);
    console.log("clearToken:", token);
  };

  const handleString = (activeStr) => {
    const str = activeStr.split("_");
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join("_").replace(/_/g, " ");
  };

  return (
    <div className="appBody">
      <Router>
          <NavBar token={token} />
        <Switch>
          <div className="appContainer">
            <Route exact path="/" render={() => <Home token={token} handleString={handleString} />} />
            <Route
              exact
              path="/foodByCuisine"
              render={() => (
                <ByCuisineIndex token={token} handleString={handleString} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <Signup updateToken={updateToken} updateRole={updateRole} />
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <Login updateToken={updateToken} updateRole={updateRole} />
              )}
            />
            <Route
              exact
              path="/logout"
              render={() => <Logout clearToken={clearToken} />}
            />
            <Route
              exact
              path="/userlikes"
              render={() => (
                <UserLikesIndex token={token} handleString={handleString} />
              )}
            />
            <Route
              exact
              path="/passwordresetrequest"
              render={() => <PasswordResetRequest />}
            />
            <Route
              exact
              path="/resetpassword/:token"
              render={() => <ResetPassword />}
            />
            <Route
              exact
              path="/foodByName"
              render={() => (
                <ByNameIndex token={token} handleString={handleString} />
              )}
            />
            <Route
              exact
              path="/foodByCity"
              render={() => (
                <ByCityIndex token={token} handleString={handleString} />
              )}
            />
            <Route
              exact
              path="/followsearch"
              render={() => (
                <FollowIndex token={token} handleString={handleString} />
              )}
            />
            <Route
              exact
              path="/followinglist"
              render={() => (
                <FollowingListIndex token={token} handleString={handleString} />
              )}
            />
            <Route
              exact
              path="/userprofile"
              render={() => (
                <UserProfileIndex token={token} handleString={handleString} />
              )}
            />
            <Route
              exact
              path="/updatesuccess"
              render={() => <UpdateSuccess />}
            />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ByCuisineIndex from "./components/Food/ByCuisineIndex";
import UserLikesIndex from "./components/Food/UserLikesIndex";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem('role')) {
      setToken(localStorage.getItem("token"))
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const updateRole = (newRole) =>{
    localStorage.setItem('role', newRole);
  }

  const clearToken = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <div>
      <Router>
        <NavBar token={token} clearToken={clearToken} />
        <Switch>
          <div>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/foodByCuisine" render={() => <ByCuisineIndex token={token} />} />
            <Route
              exact
              path="/signup"
              render={() => <Signup updateToken={updateToken} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login updateToken={updateToken} updateRole={updateRole} />}
            />
            <Route exact path="/userlikes" render={() => <UserLikesIndex token={token} />} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

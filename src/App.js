import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import PasswordResetRequest from "./components/Auth/PasswordResetRequest";
import ResetPassword from "./components/Auth/ResetPassword";
import Signup from "./components/Auth/Signup";
import ByCityIndex from "./components/Food/ByCityIndex";
import ByCuisineIndex from "./components/Food/ByCuisineIndex";
import ByNameIndex from "./components/Food/ByNameIndex";
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
    console.log('clearToken:', token)
  };

  return (
    <div>
      <Router>
        <NavBar token={token} />
        <Switch>
          <div>
            <Route exact path="/" render={() => <Home token={token}/>} />
            <Route exact path="/foodByCuisine" render={() => <ByCuisineIndex token={token} />} />
            <Route
              exact
              path="/signup"
              render={() => <Signup updateToken={updateToken} updateRole={updateRole} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login updateToken={updateToken} updateRole={updateRole} />}
            />
            <Route exact path='/logout' render={()=><Logout clearToken={clearToken} />} />
            <Route exact path="/userlikes" render={() => <UserLikesIndex token={token} />} />
            <Route exact path='/passwordresetrequest' render={()=> <PasswordResetRequest />}/>
            <Route exact path='/resetpassword/:token' render={()=> <ResetPassword />}/>
            <Route exact path='/foodByName' render={()=> <ByNameIndex token={token} />}/>
            <Route exact path='/foodByCity' render={()=> <ByCityIndex token={token} />}/>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

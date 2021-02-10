import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import NavBar from "./components/NavBar";

function App() {
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(()=>{
    if (localStorage.getItem('sessionToken')){
      setSessionToken(localStorage.getItem('sessionToken'))
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('sessionToken', newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken(null);
  }

  return (
    <div>
      <Router>
        <NavBar clearToken={clearToken} />
          <Switch>
            <Route exact path='/signup' render={()=>(<Signup updateToken={updateToken} />)}></Route>
            <Route exact path='/login' render={()=>(<Login updateToken={updateToken} />)}></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;

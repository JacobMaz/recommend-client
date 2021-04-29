import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home';
import NavBar from "./components/NavBar";

function App() {
  const [token, setToken] = useState(null);

  useEffect(()=>{
    if (localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setToken(null);
  }

  return (
    
    <div>
      <Router>
        <NavBar token={token} clearToken={clearToken} />
          <Switch>
            <Route exact path='/' render={()=>(<Home />)} />
            <Route exact path='/signup' render={()=>(<Signup updateToken={updateToken} />)} />
            <Route exact path='/login' render={()=>(<Login updateToken={updateToken} />)} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;

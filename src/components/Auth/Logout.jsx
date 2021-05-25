import { Button } from "@material-ui/core"
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";

const Logout =(props)=>{
    const [logoutRedirect, setLogoutRedirect] = useState(null)

    if (logoutRedirect === '/') {
        return <Redirect to={logoutRedirect} />
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h3>Are you sure you want to log out?
            </h3>
            <Button onClick={()=>{
              props.clearToken();
              setLogoutRedirect('/');
              }}>Yes Logout</Button>
            <Link to='/'>
                <Button>No Take Me Home</Button>
            </Link>
        </div>
    )
}

export default Logout
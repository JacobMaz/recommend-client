import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Auth = (props) => {

  const handleAuth = () => {
    return props.token === null ? (
      <div>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    ) : (
        <div>
            <Link to='/logout'>
                <Button>Log Out</Button>
            </Link>
        </div>
    );
  };

    return (
        <div>
            <div>
                {handleAuth()}
            </div>
        </div>
    )
};

export default Auth;

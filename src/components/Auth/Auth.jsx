import { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Auth = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAuth = () => {
    return props.token === null ? (
      <div>
        <MenuItem>
          <Link to="/signup" className="link">
            <Button onClick={handleClose} className='authLink'>Sign Up</Button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/login" className="link">
            <Button onClick={handleClose} className='authLink'>Login</Button>
          </Link>
        </MenuItem>
      </div>
    ) : (
      <div>
        <MenuItem>
          <Link to="/logout" className="link">
            <Button>Log Out</Button>
          </Link>
        </MenuItem>
      </div>
    );
  };

  return (
    <div>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircleIcon id='profileIcon' />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {handleAuth()}
        </Menu>
      </div>
    </div>
  );
};

export default Auth;

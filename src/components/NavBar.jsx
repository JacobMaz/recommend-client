import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

  const handleAuth =()=>{
      return props.token === null ?
        <Auth /> :
            null
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Button>Home</Button>
          </Link>
          {handleAuth()}
          {/* <Auth /> */}
          <Button onClick={props.clearToken}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

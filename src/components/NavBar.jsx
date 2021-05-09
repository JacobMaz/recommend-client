import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button} from "@material-ui/core";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <div><Auth token={props.token} clearToken={props.clearToken} /></div>
          {/* <Button onClick={()=>handleLogoutOpen()}>Log Out</Button> */}
        </Toolbar>
      </AppBar>
      <div>
      </div>
    </div>
  );
};

export default NavBar;

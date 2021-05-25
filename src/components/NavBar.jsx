import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";
import "../css/nav.css";
import myStampLogo from "../assets/mystamp.png";
import CatBar from "./CatBar";

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

  // const handleFollowingList = () => {
  //   return props.token === null ? null : (
  //     <div>
  //       <Link to="/followinglist">
  //         <Button>Following</Button>
  //       </Link>
  //       <Link to="/userprofile">
  //         <Button>Profile</Button>
  //       </Link>
  //     </div>
  //   );
  // };

  return (
    <div className={'navCatDiv'}>
      <div className={classes.root}>
        <AppBar position="static" id="navbar">
          <Toolbar id="toolbar">
            <Grid item xs={3}>
              <Link to="/">
                <img id="navHomeLogo" src={myStampLogo} alt="HOME" />
              </Link>
            </Grid>
            <Grid item xs={6}>
              <div id="navTitleDiv">
                <h1 id="navTitle">MyStamp</h1>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="authDiv">
                <Auth token={props.token} clearToken={props.clearToken} />
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
      <CatBar />
    </div>
  );
};

export default NavBar;

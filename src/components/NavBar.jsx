import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(()=>({
    root: {
        flexGrow: 1
    }
}));

const NavBar = (props) => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Link to='/'><Button>Home</Button></Link>
                    <Link to='/signup'><Button>Sign Up</Button></Link>
                    <Link to='/login'><Button>Login</Button></Link>
                    <Button onClick={props.clearToken}>Log Out</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
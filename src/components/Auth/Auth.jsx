
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

const Auth =()=>{

    return(
        <div>
            <Link to='/signup'><Button>Sign Up</Button></Link>
            <Link to='/login'><Button>Login</Button></Link>
        </div>
    )
}

export default Auth
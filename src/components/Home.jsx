
import {Link} from 'react-router-dom';

const Home =()=>{

    return(
        <div>
            <h1>App Name</h1>
            <Link to='/foodByCuisine'>Search By Cuisine
            </Link>
        </div>
    )
}

export default Home
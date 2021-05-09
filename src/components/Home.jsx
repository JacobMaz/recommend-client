
import {Link} from 'react-router-dom';

const Home =(props)=>{

    const isLoggedIn =()=>{
        return props.token === null ?
            null
                :
                    <div>
                        <Link to='/userlikes'>User Food</Link>
                    </div>
    }

    return(
        <div>
            <h1>App Name</h1>
            <Link to='/foodByCuisine'>Search By Cuisine</Link>
            <br />
            <Link to='/foodByName'>Search By Name</Link>
            <br/>
            {isLoggedIn()}
        </div>
    )
}

export default Home
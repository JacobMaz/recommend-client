
import mystampLarge from '../assets/mystampLarge.png';
import {Link} from 'react-router-dom';
import '../css/home.css';
import { useEffect, useState } from 'react';
import TTRestaurants from './TopTen/TTRestaurants';

const Home =(props)=>{
    const [allFood, setAllFood] = useState(null)

    const topLikes =()=>{
        fetch('http://localhost:3003/food/allfood', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((res)=>res.json())
            .then((data)=>{
                console.log(data)
                setAllFood(data.allFood)
            })
            .catch((error)=>console.log(error))
    }

    useEffect(()=>{
        topLikes()
    }, [])

    // const isLoggedIn =()=>{
    //     return props.token === null ?
    //         null
    //             :
    //                 <div>
    //                     <Link to='/userlikes'>User Food</Link>
    //                     <br/>
    //                     <Link to='/followsearch'>Search For User</Link>
    //                 </div>
    // }

    return(
            <div className={'homeSplash'}>
                <div>
                   <img src={mystampLarge} id='splashPageLogo'/> 
                </div>
                <div className={'topTenDiv'}>
                    <div>
                        <h1>Top Stamped</h1>
                    </div>
                    <div className={'tenRest'}>
                        <TTRestaurants allFood={allFood} handleString={props.handleString} />
                    </div>
                </div>
            </div>
    )
}

export default Home
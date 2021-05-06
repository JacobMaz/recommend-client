
import { useState } from "react"
import ByCuisine from "./ByCuisine"
import ByCuisineDisplay from "./ByCuisineDisplay";

const ByCuisineIndex =(props)=>{
    const [cuisine, setCuisine] = useState(null);
    const [results, setResults] = useState(null);

    const searchFoodByCuisine =(e)=>{
        e.preventDefault();
        fetch(`http://localhost:3003/food/cuisine/${cuisine}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            setResults(data)
        })
        .catch(error => console.log(error));
    }

    const handleDisplay =()=>{
        return results === null ? <ByCuisine searchFoodByCuisine={searchFoodByCuisine} setCuisine={setCuisine} /> : <ByCuisineDisplay results={results} token={props.token} />
    }

    return(
        <div>
            {handleDisplay()}
        </div>
    )
}

export default ByCuisineIndex
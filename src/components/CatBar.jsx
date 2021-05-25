
import { Link } from "react-router-dom";
import '../css/catBar.css'

const CatBar = ()=>{

    return (
        <div className={'catBar'}>
            <p>Stamps:</p>
            <Link>Restaurants</Link>
        </div>
    )
}

export default CatBar
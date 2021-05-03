
import { Button, TextField } from "@material-ui/core";

const ByCuisine =(props)=>{

    return (
        <div>
            <div>
                <h1>Search</h1>
            </div>
            <div>
                <form onSubmit={props.searchFoodByCuisine}>
                    <TextField label='Search by Cuisine' variant='outlined' onChange={(e) => props.setCuisine(e.target.value)} />
                    <Button type='submit'>Search</Button>
                </form>
            </div>
        </div>
    )
}

export default ByCuisine
import { Button, TextField } from "@material-ui/core";

const ByCity =(props)=>{

    return (
        <div>
            <div>
                <h1>Search</h1>
            </div>
            <div>
                <form onSubmit={props.searchFoodByCity}>
                    <TextField label='Search by City' variant='outlined' onChange={(e) => props.setCity(e.target.value)} />
                    <Button type='submit'>Search</Button>
                </form>
            </div>
        </div>
    )
}

export default ByCity
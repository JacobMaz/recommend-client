import { Button, TextField } from "@material-ui/core";

const ByName =(props)=>{

    return (
        <div>
            <div>
                <h1>Search</h1>
            </div>
            <div>
                <form onSubmit={props.searchFoodByName}>
                    <TextField label='Search by Name' variant='outlined' onChange={(e) => props.setName(e.target.value)} />
                    <Button type='submit'>Search</Button>
                </form>
            </div>
        </div>
    )
}

export default ByName
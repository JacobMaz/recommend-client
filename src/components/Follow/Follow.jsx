import { Button, TextField } from "@material-ui/core";

const Follow =(props)=>{

    return (
        <div>
            <div>
                <h1>Search</h1>
            </div>
            <div>
                <form onSubmit={props.searchUsername}>
                    <TextField label='Search for User' variant='outlined' onChange={(e) => props.setUsername(e.target.value)} />
                    <Button type='submit'>Search</Button>
                </form>
            </div>
        </div>
    )
}

export default Follow
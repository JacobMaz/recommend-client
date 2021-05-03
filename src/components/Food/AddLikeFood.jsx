
import { Button} from "@material-ui/core";

const AddLikeFood =(props)=>{

    const handleLike =(e)=>{
        e.preventDefault();
        fetch(`http://localhost:3003/like/add`, {
            method: 'POST',
            body: JSON.stringify({
                like: true,
                foodId: props.activeRestaurant.id
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `${props.token}`
            }),
        })
        .then((response) => response.json())
        .then((data)=>{
            console.log('Added Like: ', data)
        })
        .catch(error => console.log(error));
    }

    return(
        <div>
            <Button onClick={(e)=> handleLike(e)}>Like</Button>
            <Button onClick={()=> props.handleClose()}>Cancel</Button>
        </div>
    )
}

export default AddLikeFood
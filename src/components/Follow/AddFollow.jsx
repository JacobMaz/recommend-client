
import { Button} from "@material-ui/core";

const AddFollow =(props)=>{

    const handleFollow =(e)=>{
        e.preventDefault();
        fetch(`http://localhost:3003/user/follow`, {
            method: 'POST',
            body: JSON.stringify({
                id: props.activeUser.id
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `${props.token}`
            }),
        })
        .then((response) => response.json())
        .then((data)=>{
            console.log('Added Like: ', data)
            if (data.status === 'success'){
                props.searchUsername(e)
                props.handleClose();
            } else {
                console.log(data.status)
            }
        })
        .catch(error => console.log(error));
    }

    return(
        <div>
            <Button onClick={(e)=> handleFollow(e)}>Follow</Button>
            <Button onClick={()=> props.handleClose()}>Cancel</Button>
        </div>
    )
}

export default AddFollow
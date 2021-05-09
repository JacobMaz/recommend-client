import { Button } from "@material-ui/core"

const DeleteLike =(props)=>{
    console.log('ID:', props.userLikeToDelete.id)

    const handleDeleteLike =()=>{
        fetch(`http://localhost:3003/like/${props.userLikeToDelete.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `${props.token}`
            })
        }).then(res=> res.json())
            .then((data)=>{
                console.log('data.status', data.status)
                if(data.status === 'success'){
                    props.getUserLikes();
                    props.handleDeleteClose();
                } else {
                    console.log(data.status)
                }
            })
            .catch(error=>console.log(error))
    }

    return (
        <div>
            <Button onClick={()=>handleDeleteLike()}>DELETE!</Button>
        </div>
    )
}

export default DeleteLike
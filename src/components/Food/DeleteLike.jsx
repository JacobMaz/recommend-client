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
        }).then(result=>console.log(result.status))
            .catch(error=>console.log(error))
    }

    return (
        <div>
            <Button onClick={()=>handleDeleteLike()}>DELETE!</Button>
        </div>
    )
}

export default DeleteLike   
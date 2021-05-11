import { Button } from "@material-ui/core"

const Unfollow =(props)=>{
    console.log('ID:', props.userToUnfollow.id)

    const handleUnfollow =()=>{
        fetch(`http://localhost:3003/user/unfollow`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `${props.token}`
            }),
            body: JSON.stringify({
                id: props.userToUnfollow.id
            })
        }).then(res=> res.json())
            .then((data)=>{
                console.log('data.status', data.status)
                if(data.status === 'success'){
                    props.getFollowing();
                    props.handleUnfollowClose();
                } else {
                    console.log(data.status)
                }
            })
            .catch(error=>console.log(error))
    }

    return (
        <div>
            <Button onClick={()=>handleUnfollow()}>DELETE!</Button>
        </div>
    )
}

export default Unfollow;
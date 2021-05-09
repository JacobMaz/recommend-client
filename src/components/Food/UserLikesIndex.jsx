import { useEffect, useState } from "react"
import UserLikesDisplay from "./UserLikesDisplay"


const UserLikesIndex =(props)=>{
    const [activeUserLikes, setActiveUserLikes] = useState(null);

    const getUserLikes =()=> {
        fetch('http://localhost:3003/like/userlikes', {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": props.token
                })
            })
            .then((res)=>res.json())
                .then((data)=>{
                    setActiveUserLikes(data)
                })
                    .catch((error)=>console.log(error))
    }

    useEffect(()=>{
            getUserLikes()
    }, [])

    console.log('mmmmhhhmmmm', activeUserLikes)

    const handleUserLikesDisplay =()=>{
        if (activeUserLikes === null){
            return null
        } else {
            return activeUserLikes.userLikes.length > 0 ?
                <UserLikesDisplay getUserLikes={getUserLikes} activeUserLikes={activeUserLikes} token={props.token} />
                    : <div>
                        <h1>NO USER LIKES</h1>
                    </div>
        }
    }

    return (
        <div>
            <h1>User Likes</h1>
            {handleUserLikesDisplay()}
        </div>
    )
}

export default UserLikesIndex
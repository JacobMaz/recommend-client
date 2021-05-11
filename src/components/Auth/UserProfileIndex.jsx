import { useEffect, useState } from "react"
import UserProfileDisplay from "./UserProfileDisplay";


const UserProfileIndex =(props)=>{
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo=()=> {
        fetch('http://localhost:3003/user/userinfo', {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": props.token
                })
            })
            .then((res)=>res.json())
                .then((data)=>{
                    setUserInfo(data);
                })
                    .catch((error)=>console.log(error))
    }

    useEffect(()=>{
            getUserInfo()
    }, [])

    console.log('userInfo:', userInfo);

    const handleUserInfoDisplay =()=>{
        if (userInfo === null || userInfo === undefined){
            return null
        } else {
            return (
                <div>
                    <h1>INFO HERE</h1>
                    <UserProfileDisplay userInfo={userInfo} />
                </div>
            )
        }
    }

    return (
        <div>
            <h1>User Profile</h1>
            <div>{handleUserInfoDisplay()}</div>
        </div>
    )
}

export default UserProfileIndex
import { useState } from "react";
import Follow from "./Follow";
import FollowDisplay from "./FollowDisplay";

const FollowIndex = (props) => {
  const [username, setUsername] = useState(null);
  const [results, setResults] = useState(null);

  const searchUsername = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3003/user/username/${username}`, {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${props.token}`
    }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => console.log(error));
  };

  const handleDisplay = () => {
    return results === null ? (
      <Follow searchUsername={searchUsername} setUsername={setUsername} />
    ) : 
    <FollowDisplay results={results} setResults={setResults} username={username} token={props.token} searchUsername={searchUsername}/>
  };

  return (
    <div>
      <div>{handleDisplay()}</div>
    </div>
  );
};

export default FollowIndex;

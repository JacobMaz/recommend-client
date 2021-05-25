import { useState } from "react";
import ByName from "./ByName";
import ByNameDisplay from "./ByNameDisplay";

const ByNameIndex = (props) => {
  const [name, setName] = useState(null);
  const [results, setResults] = useState(null);

  const searchFoodByName = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3003/food/name/${name
        .toLocaleLowerCase()
        .replace(/ /g, "_")}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => console.log(error));
  };
  console.log("NameResults:", results);

  const handleDisplay = () => {
    return results === null ? (
      <ByName searchFoodByName={searchFoodByName} setName={setName} />
    ) : (
      <ByNameDisplay
        handleString={props.handleString}
        results={results}
        token={props.token}
        searchFoodByName={searchFoodByName}
        setResults={setResults}
      />
    );
  };

  return <div>{handleDisplay()}</div>;
};

export default ByNameIndex;

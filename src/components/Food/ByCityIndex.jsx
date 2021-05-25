import { useState } from "react";
import ByCity from "./ByCity";
import ByCityDisplay from "./ByCityDisplay";

const ByCityIndex = (props) => {
  const [city, setCity] = useState(null);
  const [results, setResults] = useState(null);

  const searchFoodByCity = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3003/food/city/${city.toLocaleLowerCase().replace(/ /g,'_')}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => console.log(error));
  };
  console.log("City Results:", results);

  const handleDisplay = () => {
    return results === null ? (
      <ByCity searchFoodByCity={searchFoodByCity} setCity={setCity} />
    ) : (
      <ByCityDisplay
        results={results}
        token={props.token}
        searchFoodByCity={searchFoodByCity}
        setResults={setResults}
      />
    );
  };

  return <div>{handleDisplay()}</div>;
};

export default ByCityIndex;

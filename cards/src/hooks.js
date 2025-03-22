import { useState } from "react";
import axios from "axios";

/** Custom hook for flipping a card */
function useFlip() {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const flipCard = () => {
    setIsFacingUp(isUp => !isUp);
  };

  return [isFacingUp, flipCard];
}

/** Custom hook for handling API requests with Axios */
function useAxios(baseUrl) {
  const [data, setData] = useState([]);

  const fetchData = async (endpoint = "") => {
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`);
      console.log("API Response:", response.data); // Debugging

      // Determine if the response comes from the Deck of Cards API or Pokémon API
      if (response.data.cards) {
        // Deck of Cards API
        setData(prevData => [...prevData, response.data.cards[0]]);
      } else if (response.data.sprites) {
        setData(prevData => [...prevData, { 
          name: response.data.name, 
          sprites: { 
            front_default: response.data.sprites.front_default, 
            back_default: response.data.sprites.back_default 
          },
          stats: response.data.stats
        }]);
      } else {
        console.error("Unexpected API response format:", response.data);
      }

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return [data, fetchData];
}

export default useFlip;
export { useAxios };
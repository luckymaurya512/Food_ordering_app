import RestaurantCard from "./RestaurantCard";
// import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import useOnlineStatus  from "./useOnlineStatus";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5288745&lng=77.2145355&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await response.json();
        console.log(json);
        const resList =
          json?.data?.cards[1]?.card.card?.gridElements?.infoWithStyle
            ?.restaurants;
        //console.log(resList);
        setListOfRestaurants(resList);
        setFilteredRestaurants(resList);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = () => {
    if (listOfRestaurants) {
      const filteredList = listOfRestaurants.filter(
        (res) => res.info.avgRating > 4.2
      );
      setFilteredRestaurants(filteredList); // Update this line
    }
  };
  // if (listOfRestaurants.length===0) {
  //   return <Shimmer />;
  // }; 

  // const onlineStatus=useOnlineStatus();
  // if(onlineStatus===false) return <h1>Looks like you're offline</h1>

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              console.log(searchText);
              const filteredRestaurants = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={handleFilter}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants &&
          filteredRestaurants.map((restaurant) => (
            <Link to={`/restaurants/${restaurant.info.id}`}>
           
              <RestaurantCard key={restaurant.info.id} resData={restaurant} />
            </Link>
          ))}
        {error && <div>Error: {error.message}</div>}
      </div>
    </div>
  );
};

export default Body;

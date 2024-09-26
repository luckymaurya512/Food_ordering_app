import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null); // Set the initial state to null
  const [menuItems, setMenuItems] = useState([]); // Separate state for menu items

  const { resId } = useParams();
  // const resInfo=useRestaurantMenu(resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5288745&lng=77.2145355&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
      );
      const json = await response.json();
      console.log(json); // Log the full response for debugging

      // Extract restaurant info safely
      const restaurantInfo = json?.data?.cards?.find(
        (card) => card.card?.card?.info
      )?.card?.card?.info || {};
      setResInfo(restaurantInfo);

      // Extract menu items safely
      const menuCard = json?.data?.cards?.find(
        (card) => card.groupedCard?.cardGroupMap?.REGULAR
      );
      const itemCards =
        menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards
          ?.flatMap((card) => card?.card?.card?.itemCards) || [];
      setMenuItems(itemCards);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const { name = "Restaurant Name", cuisines = [] } = resInfo || {};
  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2>{cuisines.length ? cuisines.join(", ") : "Cuisines not available"}</h2>
      <h1>MENU</h1>
      <ul>
        {menuItems.length > 0 ? (
          menuItems.map((menuItem, index) => (
            <li key={index}>
              {menuItem?.card?.info?.name || "Item name not available"}
            </li>
          ))
        ) : (
          <li>No menu items found</li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;

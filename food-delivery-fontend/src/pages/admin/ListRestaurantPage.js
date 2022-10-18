import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListRestaurant } from "../../features/manage/restaurant/ListRestaurant";
import { getRestaurants } from "../../redux/restaurantSlice";

const ListRestaurantPage = () => {
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurant.data);

  React.useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  return (
    <>
      <ListRestaurant restaurants={restaurants} />
    </>
  );
};

export default ListRestaurantPage;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListRestaurant } from "../../features/manage/restaurant/ListRestaurant";
import { getRestaurants } from "../../redux/restaurantSlice";

const ListRestaurantPage = () => {
  const dispatch = useDispatch();

  const restaurantState = useSelector((state) => state.restaurant);
  const restaurants = restaurantState.data;
  const isRefresh = restaurantState.isRefresh;

  React.useEffect(() => {
    dispatch(getRestaurants());
  }, [isRefresh]);

  return (
    <>
      <ListRestaurant restaurants={restaurants} />
    </>
  );
};

export default ListRestaurantPage;

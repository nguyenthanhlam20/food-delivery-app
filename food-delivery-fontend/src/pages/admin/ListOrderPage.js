import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ListOrder from "../../features/manage/order/ListOrder";
import { getAll } from "../../redux/orderSlice";

const ListOrderPage = () => {
  const dispatch = useDispatch();
  const isRefreshOrder = useSelector((state) => state.order.isRefresh);
  const orders = useSelector((state) => state.order.data);

  useEffect(() => {
    dispatch(getAll());
  }, [isRefreshOrder]);

  return (
    <>
      <ListOrder orders={orders} />
    </>
  );
};

export default ListOrderPage;

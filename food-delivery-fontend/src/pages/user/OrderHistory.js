import React from "react";
import styled from "styled-components";
import {
  Avatar,
  Button,
  Carousel,
  Input,
  InputNumber,
  Segmented,
  Space,
  Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  AppstoreOutlined,
  BarsOutlined,
  DeliveredProcedureOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DropboxOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import { getByUsername, updateOrder } from "../../redux/orderSlice";
import OrderDetailModal from "../../components/modal/order/OrderDetailModal";
var CurrencyFormat = require("react-currency-format");
var _ = require("lodash");

const Wrapper = styled.div`
  padding: 25px;
  width: 950px;
`;
const SearchBar = styled(Input)`
  width: 100%;
`;

const TopComponent = styled.div`
  width: 100%;
  padding-left: 15px;
  // height: 70px;
  display: flex;
  flex-direction: row;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const UserName = styled.div`
  font-size: 15px;
  font-weight: 700;
`;
const Role = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #40a9ff;
  text-transform: capitalize;
`;

const More = styled.div`
  border: 2px solid #40a9ff;
  border-radius: 100px;
  height: 19px;
  width: 19px;
  text-align: center;
  font-size: 12px;
  color: #40a9ff;
  margin-top: 10px;
`;

const UselessWrapper = styled.div``;

const ListFood = styled.div`
  overflow-y: scroll;
  height: 150px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MyCard = styled.div`
  padding: 0px 15px;
`;
const Title = styled.h3`
  font-weight: 700;
  font-size: 20px;
`;

const BottomComponent = styled.div`
  padding: 15px;
`;

const Food = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 5px;
`;
const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const VerticalWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Text = styled.div`
  font-weight: 600;
  font-size: 15px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  background-color: #40a9ff;
  height: 40px;
  font-weight: 700;
`;

const TotalTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const TotalValue = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const Padding = styled.div`
  padding: 10px 0px;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 50px;
  height: 23px;
  font-size: 12px;
`;
const OrderWrapper = styled.div`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
`;
const OrderStatus = styled.span``;
const FoodList = styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  margin: 10px 0px;
  padding: 10px 0px;
  max-height: 250px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const OrderList = styled.div`
  height: 550px;
  overflow: auto;
`;
const OrderFooter = styled.div`
  text-align: right;
  font-size: 18px;
  font-weight: 600;
`;

const convertToStatusStr = (status) => {
  switch (status) {
    case -1:
      return (
        <>
          <Space direction="horizontal" size={10}>
            <NodeIndexOutlined />
            <span>In Process</span>
          </Space>
        </>
      );
    case 0:
      return (
        <>
          <Space direction="horizontal" size={10}>
            <NodeIndexOutlined />
            <span>Delivering</span>
          </Space>
        </>
      );
    case 1:
      return (
        <>
          <Space direction="horizontal" size={10}>
            <NodeIndexOutlined />
            <span>Delivered</span>
          </Space>
        </>
      );
    case -2:
      return (
        <>
          <Space direction="horizontal" size={10}>
            <NodeIndexOutlined />
            <span>Cancel</span>
          </Space>
        </>
      );
  }
};

const renderOrders = (orders, dispatch, setCurrentOrder, setIsOpenModal) => {
  return orders.map((order) => {
    const total = _.sumBy(
      order.order_details,
      (f) => f.quantity * f.unit_price
    );

    const handleCancelOrder = (orderId) => {
      dispatch(updateOrder({ order_id: orderId, order_status: -2 }));
    };

    return (
      <>
        <OrderWrapper key={order.order_id}>
          <OrderStatus>{convertToStatusStr(order.order_status)}</OrderStatus>
          <FoodList>{renderFoods(order.order_details)}</FoodList>
          <OrderFooter>
            <span>Total: </span>
            <CurrencyFormat
              value={total + order.delivery_fee}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            <br />
            <Space direction="horizontal" size={10}>
              {order.order_status === -1 && order.is_paid === false ? (
                <Button
                  onClick={() => handleCancelOrder(order.order_id)}
                  style={{ margin: "10px 0px" }}
                  type="primary"
                >
                  Cancel Order
                </Button>
              ) : null}
              <Button
                onClick={() => {
                  setCurrentOrder(order);
                  setIsOpenModal(true);
                }}
                style={{ margin: "10px 0px" }}
                type="primary"
              >
                View Details
              </Button>
            </Space>
          </OrderFooter>
        </OrderWrapper>
      </>
    );
  });
};

const Orders = ({ orders, setCurrentOrder, dispatch, setIsOpenModal }) => {
  return (
    <>
      <OrderList>
        {renderOrders(orders, dispatch, setCurrentOrder, setIsOpenModal)}
      </OrderList>
    </>
  );
};

const renderFoods = (orderDetails) => {
  // console.log("--------", orderDetails);
  // console.log("first", cart);
  return orderDetails.map((order) => {
    return (
      <>
        <Food key={order.food_id}>
          <div style={{ position: "relative" }}>
            <Avatar
              style={{ marginRight: 10 }}
              size={60}
              src={order.food_images ? order.food_images[0].url : ""}
            />
            <Tag
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                // fontSize: 8,
                // width: 14,
                padding: 0,
                // height: 14,
              }}
              color="blue"
            >
              x{order.quantity}
            </Tag>
          </div>
          <VerticalWrapper>
            <Padding>
              <HorizontalWrapper>
                <Text>{order.food_name}</Text>
                <Text>
                  <CurrencyFormat
                    value={order.unit_price * order.quantity}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </Text>
              </HorizontalWrapper>
            </Padding>
            <HorizontalWrapper></HorizontalWrapper>
          </VerticalWrapper>
        </Food>
      </>
    );
  });
};
const OrderHistory = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authen.user);

  const isRefresh = useSelector((state) => state.order.isRefresh);
  const orders = useSelector((state) => state.order.data);

  const [currentOrder, setCurrentOrder] = React.useState(null);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const carousel = React.useRef();

  const inProcessOrders = orders.filter((order) => {
    return order.order_status === -1;
  });
  const deliveringOrders = orders.filter((order) => {
    return order.order_status === 0;
  });
  const deliverdOrders = orders.filter((order) => {
    return order.order_status === 1;
  });
  const cancelOrders = orders.filter((order) => {
    return order.order_status === -2;
  });

  React.useEffect(() => {
    dispatch(getByUsername({ username: user.username }));
  }, [isRefresh]);

  return (
    <>
      {isOpenModal === true ? (
        <OrderDetailModal
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          order={currentOrder}
        />
      ) : null}
      {/* <Button onClick={() => carousel.current.next()}>Next</Button> */}
      <Wrapper>
        <Space style={{ width: "100%" }} direction="vertical" size={10}>
          <Segmented
            onChange={(e) => carousel.current.goTo(e, false)}
            block
            style={{ width: "100%" }}
            options={[
              {
                label: "All Orders",
                value: "0",
                icon: <BarsOutlined />,
              },
              // {
              //   label: "Wait For Payment",
              //   value: "1",
              //   icon: <AppstoreOutlined />,
              // },
              {
                label: "In Process",
                value: "1",
                icon: <NodeIndexOutlined />,
              },
              {
                label: "Delivering",
                value: "2",
                icon: <DropboxOutlined />,
              },
              {
                label: "Delivered",
                value: "3",
                icon: <CheckCircleOutlined />,
              },
              {
                label: "Cancel",
                value: "4",
                icon: <CloseCircleOutlined />,
              },
            ]}
          />
          <SearchBar
            placeholder="Search orders by order id, products"
            prefix={<SearchOutlined />}
          />
          <Carousel speed={300} ref={carousel} dots={false}>
            <Orders
              orders={orders}
              dispatch={dispatch}
              setCurrentOrder={setCurrentOrder}
              setIsOpenModal={setIsOpenModal}
            />
            <Orders
              orders={inProcessOrders}
              dispatch={dispatch}
              setCurrentOrder={setCurrentOrder}
              setIsOpenModal={setIsOpenModal}
            />
            <Orders
              orders={deliveringOrders}
              dispatch={dispatch}
              setCurrentOrder={setCurrentOrder}
              setIsOpenModal={setIsOpenModal}
            />
            <Orders
              orders={deliverdOrders}
              dispatch={dispatch}
              setCurrentOrder={setCurrentOrder}
              setIsOpenModal={setIsOpenModal}
            />
            <Orders
              orders={cancelOrders}
              dispatch={dispatch}
              setCurrentOrder={setCurrentOrder}
              setIsOpenModal={setIsOpenModal}
            />
          </Carousel>
        </Space>
      </Wrapper>
    </>
  );
};

export default OrderHistory;

import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Space,
  Steps,
  Table,
  Tag,
} from "antd";

import { MdPedalBike, MdCarRental } from "react-icons/md";
import { OrderStatus } from "../../../constants";
import React from "react";
import { SiPaypal, SiZcash } from "react-icons/si";
import { FaPlane } from "react-icons/fa";
import { AiFillCar, AiFillCheckCircle } from "react-icons/ai";
import styled from "styled-components";
import moment from "moment";

var CurrencyFormat = require("react-currency-format");
const _ = require("lodash");

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.div`
  //   margin-left: 30px;
`;

const Title = styled.div`
  padding: 10px;
  background-color: #fafafa;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
`;
const Content = styled.div`
  padding: 10px;
  width: 100%;
  height: 145px;
`;

const DeliveryInfo = styled.div`
  background-color: #fbf8ee;
  width: 300px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
`;

const CustomerInfo = styled.div`
  background-color: #fbf8ee;

  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
`;

const PaymentInfo = styled.div`
  background-color: #fbf8ee;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
`;

const Detail = styled.div`
  width: 100%;
`;

const StyledButton = styled(Button)`
  color: #fff;
  border-radius: 0px;
  // background-color: #40a9ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
`;

const StyledRadio = styled(Radio.Button)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
`;

const Message = styled.div`
  margin-top: 10px;
  color: green;
`;

const OrderDate = styled.div`
  width: 100%;
  text-align: right;
`;

const OrderDetailModal = ({ order, isOpen, setIsOpen }) => {
  const result = OrderStatus.filter((o) => o.id === order.order_status);
  const orderStatus = result[0];

  const columns = [
    {
      title: "Food",
      key: "food",
      render: (record) => (
        <>
          <Space direction="horizontal" size={10}>
            {/* <Image width={24} height={24} src={record?.images[0].url} /> */}
            <span>{record.food_name}</span>
          </Space>
        </>
      ),
    },
    { title: "Quantity", key: "quantity", dataIndex: "quantity" },
    {
      title: "Unit Price",
      key: "unit_price",
      render: (record) => (
        <CurrencyFormat
          value={record.unit_price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      ),
    },
    {
      title: "Amount",
      key: "amount",
      render: (record) => (
        <CurrencyFormat
          value={record.unit_price * record.quantity}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      ),
    },
  ];

  const foods = order.order_details;
  const total = order.total;
  return (
    <>
      <Modal
        title={
          <>
            <Space direction="horizontal" size={430}>
              <div>
                <span>Detail of order #{order.order_id} - </span>
                <Tag color={orderStatus.color}>
                  {orderStatus.title.toUpperCase()}
                </Tag>
              </div>
              <OrderDate>
                <Tag color="#40a9ff">
                  ORDER DATE:{" "}
                  {moment(order.created_date).format("HH:mm dddd, L")}
                </Tag>
              </OrderDate>
            </Space>
          </>
        }
        width={1000}
        // className="checkout-modal"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={
          <Button onClick={() => setIsOpen(false)} key="cancel" type="primary">
            OK
          </Button>
        }
      >
        <Space direction="vertical" size={25}>
          <Info>
            <Space direction="horizontal" size={25}>
              <CustomerInfo>
                <Title>Customer Info</Title>
                <Content>
                  <Space
                    style={{ width: "100%" }}
                    direction="vertical"
                    size={10}
                  >
                    <Detail style={{ fontWeight: 600 }}>
                      {order.fullname}
                    </Detail>
                    <Detail>Phone: {order.phone}</Detail>
                    <Detail>Address: {order.address}</Detail>
                  </Space>
                </Content>
              </CustomerInfo>
              <DeliveryInfo>
                <Title>Delivery Method</Title>
                <Content>
                  <Space
                    style={{ width: "100%" }}
                    direction="vertical"
                    size={10}
                  >
                    {order.delivery_method === "normal" ? (
                      <StyledButton type="primary">
                        <Space direction="horizontal" size={5}>
                          <AiFillCar />
                          <span>Normal Delivery</span>
                        </Space>
                      </StyledButton>
                    ) : (
                      <StyledButton type="primary">
                        <Space direction="horizontal" size={5}>
                          <FaPlane />
                          <span>Fast Delivery</span>
                        </Space>
                      </StyledButton>
                    )}
                    <Detail>
                      Delivery time:
                      {moment(order.shipped_date).format(" dddd, L")}
                    </Detail>
                    <Detail>
                      Delivery by:
                      {moment()
                        .add(order.delivery_days, "days")
                        .format(" dddd, L")}
                    </Detail>
                    <Detail>
                      Delivery fee:{" "}
                      <CurrencyFormat
                        value={order.delivery_fee}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </Detail>
                  </Space>
                </Content>
              </DeliveryInfo>
              <PaymentInfo>
                <Title>Payment Method</Title>
                <Content>
                  {order.payment_method === "cash" ? (
                    <StyledButton type="primary">
                      <Space direction="horizontal" size={5}>
                        <SiZcash />
                        <span>Pay using Cash</span>
                      </Space>
                    </StyledButton>
                  ) : (
                    <>
                      <StyledButton type="primary">
                        <Space direction="horizontal" size={5}>
                          <SiPaypal />
                          <span>Pay using Paypal</span>
                        </Space>
                      </StyledButton>
                      <Message>
                        <AiFillCheckCircle
                          style={{ fontSize: 15, marginRight: 5 }}
                        />
                        Paid successfully
                      </Message>
                    </>
                  )}
                </Content>
              </PaymentInfo>
            </Space>
          </Info>
          <Table
            bordered={true}
            pagination={false}
            scroll={{
              y: 130,
            }}
            style={{
              maxHeight: 310,
              boxShadow:
                " 0 2px 8px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)",
            }}
            dataSource={foods}
            columns={columns}
            footer={() => (
              <>
                <Space direction="horizontal" size={612}>
                  <Space direction="vertical">
                    <span
                      style={{ fontWeight: 700, textTransform: "uppercase" }}
                    >
                      Amount
                    </span>
                    <span
                      style={{ fontWeight: 700, textTransform: "uppercase" }}
                    >
                      Delivery fee
                    </span>
                    <span
                      style={{ fontWeight: 700, textTransform: "uppercase" }}
                    >
                      Total
                    </span>
                  </Space>
                  <Space direction="vertical">
                    <CurrencyFormat
                      value={total}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    <CurrencyFormat
                      value={order.delivery_fee}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    <CurrencyFormat
                      style={{
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#ff3b27",
                      }}
                      value={total + order.delivery_fee}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Space>
                </Space>
              </>
            )}
          />
        </Space>
      </Modal>
    </>
  );
};

export default OrderDetailModal;

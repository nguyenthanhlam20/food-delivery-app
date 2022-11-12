import { Image, Space, Table } from "antd";
import React from "react";
import CurrencyFormat from "react-currency-format";

import styled from "styled-components";

const Card = styled.div`
  padding: 10px;
  background-color: #fff;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const OrderDetail = ({ record }) => {
  const foods = record.order_details;

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

  return (
    <>
      <Row style={{ width: "100%" }}>
        <Card>
          <p>{record.username}</p>
          <p>Address: {record.address}</p>
          <p>Phone: {record.phone}</p>
        </Card>
        <Card>
          <p>{record.username}</p>
          <p>Address: {record.address}</p>
          <p>Phone: {record.phone}</p>
        </Card>
        <Card>
          <p>{record.username}</p>
          <p>Address: {record.address}</p>
          <p>Phone: {record.phone}</p>
        </Card>
      </Row>
      <Table
        bordered={true}
        pagination={false}
        scroll={{
          y: 100,
        }}
        dataSource={foods}
        columns={columns}
        footer={() => (
          <>
            <Space direction="horizontal" size={357}>
              <span style={{ fontWeight: 700, textTransform: "uppercase" }}>
                Total
              </span>
              <CurrencyFormat
                style={{ fontWeight: 700 }}
                value={record.total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Space>
          </>
        )}
      />
    </>
  );
};

export default OrderDetail;

import React from "react";
import styled from "styled-components";
import { Dropdown, Select, Space, Table, Tag } from "antd";
import { OrderStatus } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../../../redux/orderSlice";
import OrderDetail from "../../../components/order_detail/OrderDetail";

const { Option } = Select;
const Wrapper = styled.div`
  padding: 25px;
`;

const StyledTable = styled(Table)``;

const ListOrder = ({ orders }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "ID",
      dataIndex: "order_id",
      key: "id",
      render: (text) => <Tag color="green">{`D000${text}`}</Tag>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "order_status",
      render: (_, { order_status, order_id }) => {
        const result = OrderStatus.filter(
          (s) => s.id === order_status || s.id === order_status + 1
        );
        const status = result[0];
        const nextStatus = result[1];
        const items = [
          {
            label: (
              <Tag
                onClick={() =>
                  dispatch(
                    updateOrder({
                      order_id: order_id,
                      order_status: nextStatus?.id,
                    })
                  )
                }
                color={nextStatus?.color}
              >
                {nextStatus?.title.toUpperCase()}
              </Tag>
            ),
            key: nextStatus?.id,
          }, // remember to pass the key prop
        ];
        return (
          <>
            {order_status != 1 && order_status != -2 ? (
              <Dropdown menu={{ items }}>
                <Tag color={status.color}>{status.title.toUpperCase()}</Tag>
              </Dropdown>
            ) : (
              <Tag color={status.color}>{status.title.toUpperCase()}</Tag>
            )}
          </>
        );
      },
    },
  ];

  const data = orders.map((order) => {
    return {
      ...order,
      key: order.order_id,
    };
  });

  const renderDetail = (record) => {};

  return (
    <>
      <Wrapper>
        <StyledTable
          dataSource={data}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => <OrderDetail record={record} />,
          }}
        />
      </Wrapper>
    </>
  );
};

export default ListOrder;

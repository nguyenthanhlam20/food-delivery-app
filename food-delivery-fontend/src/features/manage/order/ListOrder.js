import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  Dropdown,
  Input,
  Select,
  DatePicker,
  Space,
  Table,
  Tag,
} from "antd";
import { OrderStatus } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../../../redux/orderSlice";
import OrderDetail from "../../../components/order_detail/OrderDetail";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
const { RangePicker } = DatePicker;
const { Option } = Select;
const Wrapper = styled.div`
  padding: 25px;
`;
const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
`;

const StyledTable = styled(Table)``;

const ListOrder = ({ orders }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "ID",
      dataIndex: "order_id",
      key: "id",
      render: (text) => <Tag color="green">{`#${text}`}</Tag>,
      sorter: (a, b) => a.id === b.id,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username === b.username,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address === b.address,
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone === b.phone,
    },
    {
      title: "Order Date",
      key: "created_date",
      dataIndex: "created_date",
      render: (text) => <> {moment(text).format("HH:ss, L")}</>,
      sorter: (a, b) => a.created_date === b.created_date,
    },
    {
      title: "Shipped Date",
      key: "shipped_date",
      dataIndex: "shipped_date",
      render: (text) => <> {moment(text).format("L")}</>,
      sorter: (a, b) => a.shipped_date === b.shipped_date,
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
      render: (_, { total, delivery_fee }) => {
        return (
          <>
            <CurrencyFormat
              value={total + delivery_fee}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </>
        );
      },
      sorter: (a, b) => a.total === b.total,
    },
    {
      title: "Is Paid",
      key: "is_paid",
      dataIndex: "is_paid",
      render: (text) => {
        let color = "green";
        let title = "successful";
        if (!text) {
          color = "blue";
          title = "not yet";
        }

        return <Tag color={color}>{title.toUpperCase()}</Tag>;
      },
      sorter: (a, b) => a.is_paid === b.is_paid,
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
      sorter: (a, b) => a.order_status === b.order_status,
    },
  ];

  let data = orders.map((order) => {
    return {
      ...order,
      key: order.order_id,
    };
  });

  const [filterText, setFilterText] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState(10);
  const [filterIsPaid, setFilterIsPaid] = React.useState(null);
  const [filterFrom, setFilterFrom] = React.useState(
    moment(moment().format("L"))
  );
  const [filterTo, setFilterTo] = React.useState(moment(moment().format("L")));
  const renderDetail = (record) => {};

  data = data.filter((d) => {
    if (filterStatus === 10) {
      if (filterIsPaid === null) {
        return (
          String(d.order_id).includes(filterText) &&
          d.order_status !== filterStatus &&
          d.is_paid != filterIsPaid
        );
      } else {
        return (
          String(d.order_id).includes(filterText) &&
          d.order_status !== filterStatus &&
          d.is_paid == filterIsPaid
        );
      }
    } else {
      if (filterIsPaid === null) {
        return (
          String(d.order_id).includes(filterText) &&
          d.order_status === filterStatus &&
          d.is_paid != filterIsPaid
        );
      } else {
        return (
          String(d.order_id).includes(filterText) &&
          d.order_status === filterStatus &&
          d.is_paid == filterIsPaid
        );
      }
    }
  });

  return (
    <>
      <Wrapper>
        <Filter>
          <div>
            <Space direction="horizontal" size={25}>
              <Input
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                prefix={<AiOutlineSearch />}
                placeholder="Search order by id, phone, username"
              />
              <Select
                value={filterStatus}
                style={{
                  width: 150,
                }}
                onChange={(e) => setFilterStatus(e)}
                options={OrderStatus.map((s) => {
                  return {
                    value: s.id,
                    label: <Tag color={s.color}>{s.title.toUpperCase()}</Tag>,
                  };
                })}
              />
              <Select
                value={filterIsPaid}
                style={{
                  width: 150,
                }}
                onChange={(e) => setFilterIsPaid(e)}
                options={[
                  {
                    value: null,
                    label: <Tag color="silver">ALL</Tag>,
                  },
                  {
                    value: true,
                    label: <Tag color="green">SUCCESSFFUL</Tag>,
                  },
                  {
                    value: false,
                    label: <Tag color="blue">NOT YET</Tag>,
                  },
                ]}
              />
              <RangePicker
                value={[filterFrom, filterTo]}
                onChange={(e) => {
                  console.log(e);
                  setFilterFrom(moment(e[0]._d));
                  setFilterTo(moment(e[1]._d));
                }}
              />
            </Space>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setFilterStatus(10);
              setFilterIsPaid(null);
              setFilterText("");
              setFilterFrom(moment(moment().format("L")));
              setFilterTo(moment(moment().format("L")));
            }}
          >
            Clear Filter
          </Button>
        </Filter>
        <StyledTable
          dataSource={data}
          scroll={{
            y: 450,
          }}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => <OrderDetail order={record} />,
          }}
        />
      </Wrapper>
    </>
  );
};

export default ListOrder;

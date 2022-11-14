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
import React from "react";
import { SiPaypal, SiZcash } from "react-icons/si";
import { FaPlane } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { insertBill } from "../../redux/billSlice";
import { insertOrder } from "../../redux/orderSlice";
import moment from "moment";
import { clearCart } from "../../redux/CartSlice";

const { Step } = Steps;
const _ = require("lodash");
var CurrencyFormat = require("react-currency-format");

const StepContent = styled.div``;
const steps = [
  {
    key: 1,
    title: "Step 1",
    description: "Confirm your information",
  },
  {
    key: 2,
    title: "Step 2",
    description: "Choose delivery method",
  },
  {
    key: 3,
    title: "Step 3",
    description: "Choose payment method",
  },
  {
    key: 4,
    title: "Step 4",
    description: "Finish",
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Info = styled.div`
  margin-left: 30px;
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
  height: 116px;
`;

const DeliveryInfo = styled.div`
  background-color: #fbf8ee;
  width: 300px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
`;

const CustomerInfo = styled.div`
  background-color: #fbf8ee;

  width: 570px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
`;

const PaymentInfo = styled.div`
  background-color: #fbf8ee;
  width: 260px;
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

const StepOne = ({
  fullname,
  setFullname,
  phone,
  setPhone,
  address,
  setAddress,
}) => {
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 21,
        }}
        // initialValues={{
        //   remember: true,
        // }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          initialValue={fullname}
          label="Full name"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input onChange={(e) => setFullname(e.target.value)} />
        </Form.Item>

        <Form.Item
          initialValue={phone}
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>
        <Form.Item
          initialValue={address}
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>
      </Form>
    </>
  );
};

const StepTwo = ({ delivery, setDelivery }) => {
  // console.log(payment);
  return (
    <>
      <Radio.Group defaultValue={delivery} buttonStyle="solid">
        <Space direction="horizontal" size={20}>
          <StyledRadio
            onClick={(e) => setDelivery(e.target.value)}
            value="normal"
          >
            <Space direction="horizontal" size={5}>
              <AiFillCar /> <span>Normal Delivery</span>
            </Space>
          </StyledRadio>
          <StyledRadio
            onClick={(e) => setDelivery(e.target.value)}
            value="fast"
          >
            <Space direction="horizontal" size={5}>
              <FaPlane />
              <span>Fast Delivery</span>
            </Space>
          </StyledRadio>
        </Space>
      </Radio.Group>
    </>
  );
};
const StepThree = ({ payment, setPayment }) => {
  console.log(payment);
  return (
    <>
      <Radio.Group defaultValue={payment} buttonStyle="solid">
        <Space direction="horizontal" size={20}>
          <StyledRadio onClick={(e) => setPayment(e.target.value)} value="cash">
            <Space direction="horizontal" size={5}>
              <SiZcash /> <span>Pay using cash</span>
            </Space>
          </StyledRadio>
          <StyledRadio
            onClick={(e) => setPayment(e.target.value)}
            value="paypal"
          >
            <Space direction="horizontal" size={5}>
              <SiPaypal />
              <span>Pay using Paypal</span>
            </Space>
          </StyledRadio>
        </Space>
      </Radio.Group>
    </>
  );
};

const StepFour = ({ order, cart }) => {
  const columns = [
    {
      title: "Food",
      key: "food",
      render: (record) => (
        <>
          <Space direction="horizontal" size={10}>
            <Image width={24} height={24} src={record?.images[0].url} />
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

  const foods = cart.info.foods;
  const total = _.sumBy(foods, (f) => f.unit_price * f.quantity);
  return (
    <>
      <Wrapper>
        <Table
          bordered={true}
          pagination={false}
          scroll={{
            y: 180,
          }}
          style={{
            width: 550,
            height: 357,
            boxShadow:
              " 0 2px 8px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)",
          }}
          dataSource={foods}
          columns={columns}
          footer={() => (
            <>
              <Space direction="horizontal" size={310}>
                <Space direction="vertical">
                  <span style={{ fontWeight: 700, textTransform: "uppercase" }}>
                    Amount
                  </span>
                  <span style={{ fontWeight: 700, textTransform: "uppercase" }}>
                    Delivery fee
                  </span>
                  <span style={{ fontWeight: 700, textTransform: "uppercase" }}>
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
                    style={{ fontWeight: 700, fontSize: 18, color: "#ff3b27" }}
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
        <Info>
          <Space direction="vertical" size={10}>
            <CustomerInfo>
              <Title>Customer Info</Title>
              <Content>
                <Space style={{ width: "100%" }} direction="vertical" size={10}>
                  <Detail style={{ fontWeight: 600 }}>{order.fullname}</Detail>
                  <Detail>Phone: {order.phone}</Detail>
                  <Detail>Address: {order.address}</Detail>
                </Space>
              </Content>
            </CustomerInfo>
            <Space direction="horizontal" size={10}>
              <DeliveryInfo>
                <Title>Delivery Method</Title>
                <Content style={{ height: 145 }}>
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
                      {moment()
                        .add(order.delivery_days, "days")
                        .format(" dddd, L")}
                    </Detail>
                    <Detail>
                      Delivery by: <Tag color="blue">EXPRESS DELIVERY</Tag>
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
                <Content style={{ height: 145 }}>
                  {order.payment_method === "cash" ? (
                    <StyledButton type="primary">
                      <Space direction="horizontal" size={5}>
                        <SiZcash />
                        <span>Pay using Cash</span>
                      </Space>
                    </StyledButton>
                  ) : (
                    <StyledButton type="primary">
                      <Space direction="horizontal" size={5}>
                        <SiPaypal />
                        <span>Pay using Paypal</span>
                      </Space>
                    </StyledButton>
                  )}
                </Content>
              </PaymentInfo>
            </Space>
          </Space>
        </Info>
      </Wrapper>
    </>
  );
};

const Checkout = ({ setIsOpen, isOpen, cart }) => {
  const dispatch = useDispatch();

  const [current, setCurrent] = React.useState(0);
  const onChange = (value) => {
    // console.log("onChange:", current);
    setCurrent(value);
  };

  const total = _.sumBy(cart.info.foods, (f) => f.unit_price * f.quantity);

  const user = useSelector((state) => state.authen.user);

  const [payment, setPayment] = React.useState("cash");
  const [delivery, setDelivery] = React.useState("normal");
  const [fullname, setFullname] = React.useState(user?.username);
  const [phone, setPhone] = React.useState(user?.phone);
  const [address, setAddress] = React.useState(user?.address);
  const [order, setOrder] = React.useState(null);

  const contents = [
    <StepOne
      fullname={fullname}
      setFullname={setFullname}
      phone={phone}
      setPhone={setPhone}
      address={address}
      setAddress={setAddress}
    />,
    <StepTwo delivery={delivery} setDelivery={setDelivery} />,
    <StepThree payment={payment} setPayment={setPayment} />,
    <StepFour order={order} cart={cart} />,
  ];

  const handleCreateOrder = () => {
    let isPaid = 0;
    let fee = 2;
    let deliveryDays = 3;

    if (payment === "paypal") {
      isPaid = 1;
    }
    if (delivery === "fast") {
      fee = 5;
      deliveryDays = 1;
    }

    let order = {
      username: user.username,
      address: address,
      phone: phone,

      fullname: fullname,
      foods: cart.info.foods,
      total: total,
      payment_method: payment,
      delivery_method: delivery,
      delivery_days: deliveryDays,
      delivery_fee: fee,
      is_paid: isPaid,
      created_date: moment().format("YYYY-MM-DD HH:m:s"),
      shipped_date: moment()
        .add(deliveryDays, "days")
        .format("YYYY-MM-DD HH:m:s"),
      order_status: -1,
    };
    setOrder(order);
  };

  const renderStep = () =>
    steps.map((step) => (
      <Step
        onClick={step.key === 4 ? () => handleCreateOrder() : null}
        title={step.title}
        description={step.description}
      />
    ));

  return (
    <>
      <Modal
        className="checkout-modal"
        width={1200}
        title={
          <h3 style={{ textTransform: "capitalize" }}>
            please complete these steps
          </h3>
        }
        footer={[
          <Button key="back" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>,

          <Button
            onClick={() => {
              if (current < 2) {
                setCurrent(current + 1);
              } else {
                dispatch(insertOrder(order));
                dispatch(clearCart({ username: user.username }));
                setIsOpen(false);
              }
            }}
            key={current == 3 ? "submit" : null}
            type="primary"
            // onClick={}
          >
            {current == 3 ? "Submit" : "Next"}
          </Button>,
        ]}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <Space style={{ width: "100%" }} direction="vertical" size={30}>
          <Steps current={current} onChange={onChange}>
            {renderStep()}
          </Steps>
          <StepContent>{contents[current]}</StepContent>
        </Space>
      </Modal>
    </>
  );
};

export default Checkout;

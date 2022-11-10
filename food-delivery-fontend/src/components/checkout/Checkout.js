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
} from "antd";
import React from "react";
import { SiPaypal, SiZcash } from "react-icons/si";
import { useSelector } from "react-redux";
import styled from "styled-components";

const { Step } = Steps;
const _ = require("lodash");
var CurrencyFormat = require("react-currency-format");

const StepContent = styled.div``;
const steps = [
  {
    title: "Step 1",
    description: "Confirm your information",
  },
  {
    title: "Step 2",
    description: "Choose payment method",
  },
  {
    title: "Step 3",
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

const StepTwo = ({ payment, setPayment }) => {
  console.log(payment);
  return (
    <>
      <Radio.Group defaultValue={payment} buttonStyle="solid">
        <Space direction="horizontal" size={20}>
          <Radio.Button
            onClick={(e) => setPayment(e.target.value)}
            value="cash"
          >
            <Space direction="horizontal" size={5}>
              <SiZcash /> <span>Pay using cash</span>
            </Space>
          </Radio.Button>
          <Radio.Button
            onClick={(e) => setPayment(e.target.value)}
            value="credit"
          >
            <Space direction="horizontal" size={5}>
              <SiPaypal />
              <span>Pay using Paypal</span>
            </Space>
          </Radio.Button>
        </Space>
      </Radio.Group>
    </>
  );
};

const StepThreee = ({ fullname, phone, address, cart, payment }) => {
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
            y: 200,
          }}
          style={{ width: 550, height: 200 }}
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
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </Space>
            </>
          )}
        />
        <Info>
          <p>Fullname: {fullname}</p>
          <p>Phone: {phone}</p>
          <p>Address: {address}</p>
          {payment === "cash" ? (
            <Radio.Button>
              <Space direction="horizontal" size={5}>
                <SiZcash />
                <span>Pay using Cash</span>
              </Space>
            </Radio.Button>
          ) : (
            <Radio.Button>
              <Space direction="horizontal" size={5}>
                <SiPaypal />
                <span>Pay using Paypal</span>
              </Space>
            </Radio.Button>
          )}
        </Info>
      </Wrapper>
    </>
  );
};

const Checkout = ({ setIsOpen, isOpen, cart }) => {
  const [current, setCurrent] = React.useState(0);
  const onChange = (value) => {
    // console.log("onChange:", current);
    setCurrent(value);
  };

  const user = useSelector((state) => state.authen.user);

  const [payment, setPayment] = React.useState("cash");
  const [fullname, setFullname] = React.useState(user?.username);
  const [phone, setPhone] = React.useState(user?.phone);
  const [address, setAddress] = React.useState(user?.address);

  const contents = [
    <StepOne
      fullname={fullname}
      setFullname={setFullname}
      phone={phone}
      setPhone={setPhone}
      address={address}
      setAddress={setAddress}
    />,
    <StepTwo payment={payment} setPayment={setPayment} />,
    <StepThreee
      fullname={fullname}
      phone={phone}
      address={address}
      payment={payment}
      cart={cart}
    />,
  ];
  const description = "This is a description.";

  const renderStep = () =>
    steps.map((step) => (
      <Step title={step.title} description={step.description} />
    ));

  return (
    <>
      <Modal
        className="checkout-modal"
        style={{ height: 320 }}
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
                if (payment === "cash") {
                } else {
                }
              }
            }}
            key={current == 2 ? "submit" : null}
            type="primary"
            // onClick={}
          >
            {current == 2 ? "Submit" : "Next"}
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

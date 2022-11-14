import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  DatePicker,
  Divider,
  Input,
  message,
  Radio,
  Skeleton,
  Space,
  Tag,
} from "antd";

import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";
import { getUserByUsername, updateUserInfo } from "../../redux/userSlice";
import moment from "moment";
import FileUploader from "../file_uploader/FileUploader";

const Wrapper = styled.div`
  margin: 25px;
  width: 900px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  height: 600px;
`;

const FileUploadWrapper = styled.div`
  width: 100%;
`;

const LeftComponent = styled.div`
  padding: 25px;
  width: 22%;
  height: 100%;
`;

const RightComponent = styled.div`
  padding: 25px;
  height: 100%;
  width: 78%;
`;

const StyledInput = styled(Input)`
  width: 300px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 300px;
`;
const StyledTextArea = styled(TextArea)`
  width: 620px;
  resize: none;
`;
const Title = styled.h2``;

const Label = styled.div``;

const StyledInputGroup = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
`;
const Profile = ({ user }) => {
  console.log("first", user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [gender, setGender] = React.useState();
  const [dob, setDob] = React.useState();
  const [address, setAddress] = React.useState();
  const [image, setImage] = React.useState([]);

  console.log("image", image);
  React.useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setPhone(user.phone);
      setGender(user.gender);
      setDob(moment(user?.dob));
      setAddress(user.address);
      if (user.img_url !== "") {
        setImage([{ url: user.img_url, name: user.img_name }]);
      }
    }
  }, [user]);
  console.log("first", image);
  return (
    <>
      <Wrapper>
        <LeftComponent>
          <Space style={{ width: "100%" }} direction="vertical" size={20}>
            {image[0]?.url ? (
              <Avatar
                size={150}
                style={{ marginRight: 10, border: "1px solid #40a9ff" }}
                src={image[0]?.url}
              />
            ) : (
              <Skeleton.Avatar size={150} active />
            )}
            <FileUploadWrapper>
              <Space direction="vertical" style={{ width: "100%" }} size={10}>
                {/* <Label>Avatar: </Label> */}
                <FileUploader
                  fileList={image}
                  setFileList={setImage}
                  firebaseFolderName={`user/${user?.username}`}
                  maxFile={1}
                  btnMessage={"Upload Avatar"}
                />
              </Space>
            </FileUploadWrapper>
          </Space>
        </LeftComponent>
        <Divider
          style={{ height: "100%", backgroundColor: "#ccc" }}
          type="vertical"
        />
        <RightComponent>
          <Title>My Profile</Title>
          <Space direction="vertical" size={15}>
            <Space direction="horizontal" size={20}>
              <Space direction="vertical" size={5}>
                <Label>Username</Label>
                <StyledInput disabled value={user?.username} />
              </Space>
              <Space direction="vertical" size={5}>
                <Label>Role</Label>
                <Tag color="tomato">
                  {user?.role ? user?.role.toUpperCase() : ""}
                </Tag>
              </Space>
            </Space>
            <Space direction="horizontal" size={20}>
              <Space direction="vertical" size={5}>
                <Label>First Name</Label>
                <StyledInput
                  value={firstName}
                  placeholder="Please enter your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Space>
              <Space direction="vertical" size={5}>
                <Label>Last Name</Label>
                <StyledInput
                  value={lastName}
                  placeholder="Please enter your last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Space>
            </Space>
            <Space direction="horizontal" size={20}>
              <Space direction="vertical" size={5}>
                <Label>Email</Label>
                <StyledInput
                  value={email}
                  placeholder="Please enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Space>
              <Space direction="vertical" size={5}>
                <Label>Phone</Label>
                <StyledInput
                  value={phone}
                  placeholder="Please enter your phone number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Space>
            </Space>
            <Space direction="horizontal" size={20}>
              <Space direction="vertical" size={5}>
                <Label>Dob</Label>

                <StyledDatePicker
                  value={dob}
                  format={"DD/MM/YYYY"}
                  onChange={(e) => setDob(moment(e))}
                  placeholder="Choose your date of birth"
                />
              </Space>
              <Space direction="vertical" size={5}>
                <Label>Gender</Label>
                <Radio.Group
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                  buttonStyle="solid"
                >
                  <Radio.Button style={{ marginRight: 10 }} value={false}>
                    Male
                  </Radio.Button>
                  <Radio.Button value={true}>Female</Radio.Button>
                </Radio.Group>
              </Space>
            </Space>
            <Space direction="horizontal" size={20}>
              <Space direction="vertical" size={5}>
                <Label>Address</Label>
                <StyledTextArea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ height: 100 }}
                  placeholder="Please enter your address"
                  allowClear
                />
              </Space>
            </Space>
          </Space>
          <Button
            onClick={() => {
              dispatch(
                updateUserInfo({
                  username: user.username,
                  first_name: firstName,
                  last_name: lastName,
                  img_url: "",
                  phone: phone,
                  email: email,
                  dob: dob,
                  address: address,
                  gender: gender,
                  img_url: image[0]?.url ? image[0].url : "",
                  img_name: image[0]?.name ? image[0].name : "",
                })
              );
              message.success("Updated Profile Successfully!");
            }}
            style={{ marginTop: 50 }}
            type="primary"
          >
            Save Changes
          </Button>
        </RightComponent>
      </Wrapper>
    </>
  );
};

export default Profile;

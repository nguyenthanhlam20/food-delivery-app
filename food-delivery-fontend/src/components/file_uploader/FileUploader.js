import React, { useState } from "react";
import styled from "styled-components";

import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Progress, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import handleUpload from "../../firebase/handle-upload";
import handleDelete from "../../firebase/handle-delete";
import { LIST_IGNORE } from "antd/lib/upload/Upload";

const props = {};

const Header = styled.header`
  position: absolute;
  left: 20px;
  top: -12px;
  background-color: #fff;
  text-transform: capitalize;
  font-weight: 400;
`;
const Wrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 13px;
  padding: 20px;
  position: relative;
`;

const FileUploader = ({ images, setImages }) => {
  const [fileList, setFileList] = useState([]);
  const [percent, setPercent] = useState(0);

  const onChange = (info) => {
    // console.log(info.fileList);
    setFileList(info.fileList);
    if (info.file.status === "uploading") {
      console.log("file is uploading");
    }
    if (info.file.status === "done") {
      console.log("file uploaded successful");
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      console.log("file uploaded error");
    }
  };
  const uploadImage = (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const response = handleUpload({
      file: file,
      setPercent: setPercent,
      firebaseFolderName: "restaurant-image",
      onProgress: onProgress,
      onSuccess: onSuccess,
    });

    response.then((result) => {
      const imagesClone = images.slice();
      imagesClone.push(result);
      console.log("upload image response", imagesClone);
      setImages(imagesClone);
    });
  };

  return (
    <>
      <Wrapper>
        <Header>Add images</Header>
        <Upload
          // data={(file) => (file.status =)}
          beforeUpload={(file) => {
            let existFileStatus = false;
            fileList.map((currentFile) => {
              if (file.name === currentFile.name) {
                existFileStatus = true;
              }
            });

            if (existFileStatus) message.error(`File is already exist`);

            return !existFileStatus;
          }}
          fileList={fileList}
          customRequest={uploadImage}
          onChange={onChange}
          onRemove={(file) => {
            // console.log(fileList);

            handleDelete({
              firebaseFolderName: "restaurant-image",
              fileName: file.name,
            });
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {/* {fileList.length > 0 ? <Progress percent={percent} /> : null} */}
      </Wrapper>
    </>
  );
};

export default React.memo(FileUploader);

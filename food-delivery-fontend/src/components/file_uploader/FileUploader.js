import React, { useState } from "react";
import styled from "styled-components";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message, Progress, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import handleUpload from "../../firebase/handle-upload";
import handleDelete from "../../firebase/handle-delete";
import { LIST_IGNORE } from "antd/lib/upload/Upload";
import { MdOutlineInfo } from "react-icons/md";

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

const FileUploader = ({
  firebaseFolderName,
  fileList,
  setFileList,
  maxFile,
  btnMessage,
}) => {
  const [currentFile, setCurrentFile] = React.useState(null);
  // console.log("RE-RENDER FILE UPLOADER");
  if (currentFile != null) {
    let fileCloneList = fileList?.slice();
    fileCloneList[fileCloneList.length - 1].url = currentFile.url;
    setFileList(fileCloneList);
    setCurrentFile(null);
  } else {
    // console.log("CURRENT FILE IS NULL");
    // console.log("UPLOADED FILE", fileList);
  }

  const onChange = (info) => {
    setFileList(info.fileList);
    if (info.file.status === "uploading") {
      console.log("file is uploading");
    }
    if (info.file.status === "done") {
      console.log("file uploaded successful");
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      console.log("file uploaded error");
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadImage = async (options) => {
    // console.log("RUN TO CLICK EVENT", options);
    const { onSuccess, onError, file, onProgress } = options;

    await handleUpload({
      file: file,
      // setPercent: setPercent,
      firebaseFolderName: firebaseFolderName,
      onProgress: onProgress,
      onSuccess: onSuccess,
      setCurrentFile: setCurrentFile,
    });
  };

  return (
    <>
      <Upload
        style={{ width: "100%" }}
        maxCount={maxFile}
        accept="image/*"
        // data={(file) => ((file.status === "done"))}
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
            firebaseFolderName: firebaseFolderName,
            fileName: file.name,
          });
        }}
      >
        <Button type="primary" icon={<UploadOutlined />}>
          {btnMessage}
        </Button>
      </Upload>
    </>
  );
};

export default React.memo(FileUploader);

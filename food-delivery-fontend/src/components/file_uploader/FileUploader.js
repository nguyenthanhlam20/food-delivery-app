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

const FileUploader = ({ firebaseFolderName, fileList, setFileList }) => {
  // console.log("default image list", fileList);

  const [currentFile, setCurrentFile] = React.useState(null);

  const onChange = (info) => {
    let fileCloneList = info.fileList.slice();
    if (currentFile != null) {
      fileCloneList = fileCloneList.map((file) => {
        if (file.name === currentFile.name) {
          console.log("equal");
          file.url = currentFile.url;
        }

        return file;
      });
    }

    console.log("FIRST");

    // console.log("file", info.file);

    setFileList(fileCloneList);
    if (info.file.status === "uploading") {
      console.log("file is uploading");
    }
    if (info.file.status === "done") {
      setCurrentFile(null);
      console.log("file uploaded successful");
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      console.log("file uploaded error");
    }
  };
  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const response = await handleUpload({
      file: file,
      // setPercent: setPercent,
      firebaseFolderName: firebaseFolderName,
      onProgress: onProgress,
      onSuccess: onSuccess,
    })
      .then((fileResult) => {
        console.log("SECOND");

        setCurrentFile(fileResult);
      })
      .catch(() => console.log("faffafafaf"));
  };

  return (
    <>
      <Wrapper>
        <Header>Add images</Header>
        <Upload
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
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {/* {fileList.length > 0 ? <Progress percent={percent} /> : null} */}
      </Wrapper>
    </>
  );
};

export default React.memo(FileUploader);

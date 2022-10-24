import React, { useState } from "react";
import styled from "styled-components";

import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Progress, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import handleUpload from "../../firebase/handle-upload";
import handleDelete from "../../firebase/handle-delete";

const props = {};

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [percent, setPercent] = useState(0);

  const onChange = (info) => {
    setFileList(info.fileList);
    // console.log(info);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  console.log(percent);

  return (
    <>
      <Upload
        customRequest={(info) =>
          handleUpload({
            file: info.file,
            setPercent: setPercent,
            firebaseFolderName: "restaurant-image",
          })
        }
        progress={{ strokeWidth: 2, showInfo: false }}
        onChange={onChange}
        onRemove={(info) => handleDelete({ fileName: info.fileName })}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Progress percent={percent} />
    </>
  );
};

export default React.memo(FileUploader);

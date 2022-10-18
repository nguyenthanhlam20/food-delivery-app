import React from "react";
import styled from "styled-components";
import storage from "../firebase/firebase-config";

import { Progress } from "antd";

import {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const Wrapper = styled.div``;

const Image = styled.img`
  display: ${(props) => props.display};
`;

const FileUpload = ({ setImageUrl }) => {
  const [file, setFile] = React.useState("");
  const [percent, setPercent] = React.useState(0);

  const [previewFile, setPreviewFile] = React.useState("");
  const [display, setDisplay] = React.useState("none");

  function handleChange(event) {
    setFile(event.target.files[0]);
    setPreviewFile(URL.createObjectURL(file));
    setDisplay("block");
    console.log(file);
  }

  function handleUpload() {
    if (file === "") {
      alert("Please choose a file first!");
      return;
    }

    const storageRef = ref(storage, `/category_images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageUrl(url);
        });
      }
    );
  }

  return (
    <>
      <Wrapper>
        <input type="file" onChange={handleChange} accept="*" />
        <button onClick={handleUpload}>Upload to Firebase</button>
        <Progress percent={percent} size="small" />
        <Image src={previewFile} alt="image" display={display} />
      </Wrapper>
    </>
  );
};

export default FileUpload;

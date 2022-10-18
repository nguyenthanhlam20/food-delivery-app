import React from "react";
import styled from "styled-components";
import storage from "../../firebase/firebase-config";

import {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const Wrapper = styled.div``;

const AdminHomePage = () => {
  const [file, setFile] = React.useState("");
  const [percent, setPercent] = React.useState(0);
  const [url, setUrl] = React.useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
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
          setUrl(url);
        });
      }
    );
  }

  return (
    <>
      <Wrapper>
        <input type="file" onChange={handleChange} accept="*" />
        <button onClick={handleUpload}>Upload to Firebase</button>
        <p>{percent} "% done"</p>
        <img src={url} alt="image" />
      </Wrapper>
    </>
  );
};

export default AdminHomePage;

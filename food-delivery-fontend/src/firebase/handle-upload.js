import storage from "./firebase-config";

import {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const handleUpload = ({ file, setPercent, firebaseFolderName }) => {
  console.log("file", file);
  if (file != null) {
    const storageRef = ref(storage, `${firebaseFolderName}/${file.name}`);
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
          return url;
        });
      }
    );
  }
};

export default handleUpload;

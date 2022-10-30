import storage from "./firebase-config";

import {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const handleUpload = async ({
  file,
  // setPercent,
  firebaseFolderName,
  onProgress,
  onSuccess,
  setCurrentFile,
}) => {
  if (file != null) {
    // console.log("RUN TO HANDLE UPLOAD");
    const storageRef = ref(storage, `${firebaseFolderName}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      async (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (percent != 100) {
          onProgress({ percent: percent });
        }
        // console.log("RUN HERE TO GET PERCENT", percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setCurrentFile({ url: url, name: file.name, status: "done" });
          onProgress({ percent: 100 });
          onSuccess("Ok");
        });
      }
    );
  }
};

export default handleUpload;

import storage from "./firebase-config";

import {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const handleUpload = ({
  file,
  setPercent,
  firebaseFolderName,
  onProgress,
  onSuccess,
}) => {
  if (file != null) {
    const storageRef = ref(storage, `${firebaseFolderName}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        onProgress({ percent: percent });
        if (percent == 100) {
          onSuccess("Ok");
        }
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          return { url: url, fileName: file.name };
        });
      }
    );
  }
};

export default handleUpload;

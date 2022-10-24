import storage from "./firebase-config";
import { ref, deleteObject } from "firebase/storage";

// Create a reference to the file to delete

// Delete the file

const handleDelete = ({ fileName }) => {
  const desertRef = ref(storage, fileName);
  deleteObject(desertRef)
    .then(() => {
      console.log("delete successfully");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};


export default handleDelete;
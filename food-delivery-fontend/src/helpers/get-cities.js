import axios from "axios";
import React from "react";

const getCities = () => {
  const citi = [];
  const callApi = async () => {
    await axios
      .get("https://provinces.open-api.vn/api/?depth=3")
      .then((response) => {
        response.data.map((city) => {
          citi.push(city);
        });
      });
  };
  callApi();
  // console.log(citi);
  return citi;
};

export default getCities;

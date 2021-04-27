import React, { useState, useEffect } from "react";
import "./Description.css";

const baseurl = "https://cloud.iexapis.com/stable";
const apitoken = "pk_c08ad6d2c5a145478089d56830afe569";

function Description({ focusedStock }) {
  const [data, setData] = useState("");
  const [logo, setLogo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseurl}/stock/${focusedStock}/company?token=${apitoken}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
        });
    };
    const fetchLogo = async () => {
      await fetch(`${baseurl}/stock/${focusedStock}/company?token=${apitoken}`)
        .then((response) => response.json())
        .then((data) => {
          setLogo(data);
        });
    };
    fetchData();
  }, [focusedStock]);

  return (
    <div className="details">
      <figure className="logo">
        <img src="logo192.png" alt="Logo not found" width="100" height="100" />
        <figcaption>
          <center>
            <small>Company logo</small>
          </center>
        </figcaption>
      </figure>

      <div className="description">
        {data.description?.length > 0 ? (
          <small>{data.description}</small>
        ) : (
          <small>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </small>
        )}
      </div>
    </div>
  );
}

export default Description;

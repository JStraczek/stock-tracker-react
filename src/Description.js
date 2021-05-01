import React, { useState, useEffect } from "react";
import "./Description.css";
import { iex } from "./tokens.js";

const baseurl = "https://cloud.iexapis.com/stable";
const apitoken = iex.api_token;

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
            Description not available or you have not chosen a stock
          </small>
        )}
      </div>
    </div>
  );
}

export default Description;

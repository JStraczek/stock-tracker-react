import React, { useState, useEffect } from "react";
import "./Table.css";
import { iex } from "./tokens.js";

const baseurl = "https://cloud.iexapis.com/stable";
const apitoken = iex.api_token;

function Table({ trackedStocks, handleFocusStock }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStockData = async (symbol) => {
      await fetch(`${baseurl}/stock/${symbol}/quote?token=${apitoken}`)
        .then((response) => response.json())
        .then((data) => {
          const stock = {
            symbol: data.symbol,
            price: data.latestPrice,
          };
          setStocks((oldArray) => [...oldArray, stock]);
        });
    };
    setStocks([]);
    trackedStocks.forEach((symbol) => {
      fetchStockData(symbol);
    });
  }, [trackedStocks]);
  return (
    <div className="table">
      <th>
        <td>Symbol</td>
        <td>Price</td>
      </th>
      <div className="content">
        {stocks.map(({ symbol, price, index }) => (
          <tr
            key={index}
            onClick={() => {
              handleFocusStock(symbol);
            }}
          >
            <td>
              <strong>{symbol}</strong>
            </td>
            <td>{price}</td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default Table;

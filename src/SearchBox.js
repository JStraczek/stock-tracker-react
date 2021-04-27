import React, { useState, useEffect } from "react";
import "./SearchBox.css";
import { TextField } from "@material-ui/core";

const apikey = "MCCRAWKHKGQ629ZQ";

function SearchBox({ handleAddTrackedStock }) {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getSearchResults();
  }, [keyword]);

  const getSearchResults = async () => {
    if (keyword.length > 2) {
      await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apikey}`
      )
        .then((response) => response.json())
        .then((data) => {
          try {
            setSearchResults(data["bestMatches"]);
          } catch (err) {
            console.log("API limit reached, please wait...");
          }
        });
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="search-box">
      <TextField
        id="input"
        label="Searchbox"
        variant="outlined"
        list="data"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="results">
        {searchResults?.length > 0 &&
          searchResults.map((result, index) => (
            <tr
              key={index}
              onClick={() => {
                handleAddTrackedStock(result["1. symbol"]);
                document.getElementById("input").value = "";
                setKeyword("");
              }}
            >
              <td>
                <strong>{result["1. symbol"]}</strong>
              </td>
              <td>{result["2. name"]}</td>
            </tr>
          ))}
      </div>
    </div>
  );
}

export default SearchBox;

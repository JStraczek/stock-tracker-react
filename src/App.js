import "./App.css";
import { Card, CardContent } from "@material-ui/core";
import { useState } from "react";
import SearchBox from "./SearchBox";
import Table from "./Table";
import Chart from "./Chart";
import Description from "./Description";

function App() {
  const [trackedStocks, setTrackedStocks] = useState([]);
  const [focusedStock, setFocusedStock] = useState("");

  const handleAddTrackedStock = (symbol) => {
    setTrackedStocks((oldArray) => [...oldArray, symbol]);
    setFocusedStock(symbol);
  };

  const handleFocusStock = (symbol) => {
    setFocusedStock(symbol);
  };

  return (
    <div className="app">
      <div className="app__left">
        <h1>React Stock Tracker</h1>

        <Card className="app__chartbox">
          <CardContent>
            <Chart focusedStock={focusedStock} className="app__chart" />
          </CardContent>
        </Card>

        <Card className="app__descriptionbox">
          <CardContent>
            <h3>Stock description: </h3>
            <Description focusedStock={focusedStock} />
          </CardContent>
        </Card>
      </div>

      <div className="app__right">
        <Card className="app__searchbox">
          <CardContent>
            <SearchBox handleAddTrackedStock={handleAddTrackedStock} />
          </CardContent>
        </Card>
        <Card className="app__list">
          <CardContent>
            <h3>Tracked Stocks</h3>
            <Table
              trackedStocks={trackedStocks}
              handleFocusStock={handleFocusStock}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

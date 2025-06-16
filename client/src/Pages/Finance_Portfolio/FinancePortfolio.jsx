import { useState, useEffect } from "react";
import axios from "axios";
import {
  useAddStocksMutation,
  useGetStockSymbolQuery,
  useGetUserStockQuery,
  useUpdateStocksMutation,
} from "../../features/Stocks/stocksApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

const StockTable = () => {
  const user = useSelector(selectCurrentUser);
  const [addStock] = useAddStocksMutation();

  const [updateStock] = useUpdateStocksMutation();

  const { data: userStocks } = useGetUserStockQuery(user.id);

  const {data: stockSymbols} = useGetStockSymbolQuery();
  const [stocks, setStocks] = useState([]);

  const [symbols, setSymbols] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [activeInputIndex, setActiveInputIndex] = useState(null);



  useEffect(() => {
    if (userStocks?.stocks && userStocks?.stocks?.length > 0) {
      // If the backend returns user stocks, set them to the local state
      const mappedStocks = userStocks?.stocks.map((s) => ({
        name: s.stockName,
        shares: s.purchasedShares,
        buyPrice: s.buyPrice,
        purchaseDate: s.purchaseDate,
        currentPrice: s.currentPrice || "-", // optional
        profit: s.profit || "-",
        profitPercent: s.profitPercentage || "-",
        _id: s._id,
      }));
      setStocks(mappedStocks);
    }
  }, [userStocks]);


 useEffect(() => {
  if (stockSymbols) {
    setSymbols(stockSymbols.map((sym) => sym.symbol));
  }
}, [stockSymbols]);

  const [loadingIndex, setLoadingIndex] = useState(null);

  const fetchCurrentPrice = async (index) => {
    const stock = stocks[index];
    const symbol = stock.name.toUpperCase().trim();
    if (!symbol) {
      alert("Please enter a valid stock symbol.");
      return;
    }

    const { shares, buyPrice } = stock;
    if (!shares || !buyPrice) {
      alert("Please enter valid Shares and Buy Price.");
      return;
    }

    setLoadingIndex(index);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/stock?name=${symbol}`
      );
      console.log("this is response", response);
      const currentPrice = parseFloat(response.data.data.regularMarketPrice);
      setLoadingIndex(null);
      const profit = ((currentPrice - buyPrice) * shares).toFixed(2);
      const profitPercent = (
        ((currentPrice - buyPrice) / buyPrice) *
        100
      ).toFixed(2);

      const updatedStock = {
        ...stock,
        currentPrice,
        profit,
        profitPercent,
      };
      console.log("this is updated stock", updatedStock);

      setStocks((prevStocks) => {
        const updatedStocks = [...prevStocks];
        updatedStocks[index] = {
          ...updatedStocks[index],
          currentPrice,
          profit,
          profitPercent,
        };
        return updatedStocks;
      });

      console.log("Updated stock before setting state:", updatedStock);

      // Save or update stock in backend
      if (updatedStock._id) {
        // Update existing stock
        // await axios.put(
        //   `http://localhost:8000/add-stocks/${updatedStock._id}`,
        //   updatedStock
        // );
        const response = await updateStock({
          stock: updatedStock,
          id: updatedStock._id,
        }).unwrap();
        console.log("Stock updated:", response);
      } else {
        // Create new stock
        const saveResponse = await addStock(updatedStock).unwrap();
        console.log("New stock saved:", saveResponse.data);
        updatedStock._id = saveResponse.data._id; // Update frontend with new _id from backend
      }

      setStocks((prevStocks) => {
        const updatedStocksArray = [...prevStocks];
        updatedStocksArray[index] = updatedStock;
        return updatedStocksArray;
      });

      // if (parseFloat(profitPercent) > 30) {
      //   try {
      //     await emailjs.send(
      //       EMAILJS_SERVICE_ID,
      //       EMAILJS_TEMPLATE_ID,
      //       {
      //         stock_name: symbol,
      //         profit_percent: profitPercent,
      //         message: `Profit of ${profitPercent}% reached for ${symbol}.`,
      //       },
      //       EMAILJS_PUBLIC_KEY
      //     );
      //     // alert(`Profit alert email sent for ${symbol}!`);
      //   } catch (emailError) {
      //     console.error("Error sending email alert:", emailError);
      //     alert("Failed to send profit alert email.");
      //   }
      // }
    } catch (error) {
      console.error("Error fetching or saving stock price:", error);
      // alert("Error fetching or saving stock price. Try again later.");
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...stocks];
    updated[index][field] =
      field === "shares" || field === "buyPrice"
        ? parseFloat(value) || ""
        : value;
    // Reset calculated fields if inputs change
    if (field === "shares" || field === "buyPrice" || field === "name") {
      updated[index].currentPrice = "-";
      updated[index].profit = "-";
      updated[index].profitPercent = "-";
    }
    setStocks(updated);
    // Update suggestions if typing in name
    if (field === "name") {
      const inputVal = value.toUpperCase();
      const filtered = symbols.filter((sym) =>
        sym.toUpperCase().startsWith(inputVal)
      );
      setSuggestions(filtered);
      setActiveInputIndex(index);
    }
  };

  const addRow = () => {
    setStocks([
      ...stocks,
      {
        name: "",
        shares: "",
        buyPrice: "",
        currentPrice: "-",
        profit: "-",
        profitPercent: "-",
        purchaseDate: "",
        _id: null,
      },
    ]);
  };

  const selectSuggestion = (symbol) => {
    if (activeInputIndex !== null) {
      const updated = [...stocks];
      updated[activeInputIndex].name = symbol;
      setStocks(updated);
      setSuggestions([]);
      setActiveInputIndex(null);
    }
  };

  const totalShares = stocks.reduce(
    (sum, s) => sum + (parseFloat(s.shares) || 0),
    0
  );
  const totalProfit = stocks
    .reduce((sum, s) => sum + (parseFloat(s.profit) || 0), 0)
    .toFixed(2);

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#fff",
      color: "#1E90FF",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    tableWrapper: { overflowX: "auto" },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      color: "#1E90FF",
      minWidth: "720px",
    },
    th: {
      border: "1px solid #1E90FF",
      padding: "8px",
      backgroundColor: "#001F3F",
      textAlign: "center",
    },
    td: {
      border: "1px solid #1E90FF",
      padding: "8px",
      textAlign: "center",
      position: "relative",
    },
    profitPositive: { color: "limegreen", fontWeight: "bold" },
    profitNegative: { color: "red", fontWeight: "bold" },
    button: {
      backgroundColor: "#1E90FF",
      border: "none",
      color: "white",
      padding: "6px 12px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    buttonDisabled: {
      backgroundColor: "#555555",
      border: "none",
      color: "#cccccc",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "not-allowed",
    },
    addButton: {
      marginTop: "10px",
      backgroundColor: "#1E90FF",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    input: {
      backgroundColor: "#000",
      border: "1px solid #1E90FF",
      color: "#1E90FF",
      padding: "4px",
      width: "90%",
      borderRadius: "3px",
      textAlign: "center",
    },
    arrowUp: { color: "limegreen", marginLeft: "6px", fontWeight: "bold" },
    arrowDown: { color: "red", marginLeft: "6px", fontWeight: "bold" },
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <h2
          style={{
            margin: 0,
            width: "100%",
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          📈 Stock Profit Tracker
        </h2>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Stock Name</th>
              <th style={styles.th}>Shares</th>
              <th style={styles.th}>Buy Price</th>
              <th style={styles.th}>Purchase Date</th>
              <th style={styles.th}>Current Price</th>
              <th style={styles.th}>Profit</th>
              <th style={styles.th}>Profit %</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, idx) => {
              const profitPercent = parseFloat(stock.profitPercent);
              const profitStyle =
                !isNaN(profitPercent) && stock.profitPercent !== "-"
                  ? profitPercent >= 0
                    ? styles.profitPositive
                    : styles.profitNegative
                  : {};

              // Disable check button if invalid inputs or already loading
              // const disableCheck =
              //   loadingIndex === idx ||
              //   !stock.name.trim() ||
              //   !stock.shares ||
              //   !stock.buyPrice;

              return (
                <tr key={idx}>
                  <td style={styles.td}>
                    <input
                      type="text"
                      style={styles.input}
                      value={stock.name}
                      onChange={(e) =>
                        handleChange(idx, "name", e.target.value)
                      }
                      onFocus={() => setActiveInputIndex(idx)}
                      onBlur={() => setTimeout(() => setSuggestions([]), 150)}
                    />
                    {activeInputIndex === idx && suggestions.length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          backgroundColor: "#001F3F",
                          border: "1px solid #1E90FF",
                          zIndex: 10,
                          maxHeight: "120px",
                          overflowY: "auto",
                          color: "#1E90FF",
                        }}
                      >
                        {suggestions.map((s, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "6px",
                              cursor: "pointer",
                              borderBottom: "1px solid #1E90FF",
                            }}
                            onMouseDown={() => selectSuggestion(s)}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      style={styles.input}
                      value={stock.shares}
                      onChange={(e) =>
                        handleChange(idx, "shares", e.target.value)
                      }
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      style={styles.input}
                      value={stock.buyPrice}
                      onChange={(e) =>
                        handleChange(idx, "buyPrice", e.target.value)
                      }
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="date"
                      style={styles.input}
                      value={stock.purchaseDate}
                      onChange={(e) =>
                        handleChange(idx, "purchaseDate", e.target.value)
                      }
                    />
                  </td>
                  <td style={styles.td}>{stock.currentPrice}</td>
                  <td style={styles.td}>
                    {stock.profit}{" "}
                    {!isNaN(profitPercent) &&
                      stock.profitPercent !== "-" &&
                      (profitPercent >= 0 ? (
                        <span style={styles.arrowUp}>↑</span>
                      ) : (
                        <span style={styles.arrowDown}>↓</span>
                      ))}
                  </td>
                  <td style={{ ...styles.td, ...profitStyle }}>
                    {stock.profitPercent !== "-"
                      ? `${stock.profitPercent}%`
                      : "-"}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => {
                        fetchCurrentPrice(idx);
                      }}
                      style={
                        loadingIndex === idx
                          ? styles.buttonDisabled
                          : styles.button
                      }
                      disabled={loadingIndex === idx}
                    >
                      {loadingIndex === idx ? "Checking..." : "Check"}
                    </button>
                  </td>
                </tr>
              );
            })}

            <tr style={{ fontWeight: "bold" }}>
              <td style={styles.td}>Total</td>
              <td style={styles.td}>{totalShares}</td>
              <td style={styles.td}></td>
              <td style={styles.td}></td>
              <td style={styles.td}></td>
              <td style={styles.td}>{totalProfit}</td>
              <td style={styles.td}></td>
              <td style={styles.td}></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button style={styles.addButton} onClick={addRow}>
        Add New Stock
      </button>
    </div>
  );
};

export default StockTable;

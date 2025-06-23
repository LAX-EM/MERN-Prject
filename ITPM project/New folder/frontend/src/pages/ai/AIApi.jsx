import React, { useState } from "react";
import axios from "axios";

const AIApi = () => {
    const [symbol, setSymbol] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPrediction = async () => {
        setLoading(true);
        setError("");
        setPrediction(null);

        try {
            const apiKey = "sk_1234567890abcdefGHIJKLMNOPQR"; 
            const response = await axios.get(
                `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
            );

            if (response.data["Time Series (5min)"]) {
                const timeSeries = response.data["Time Series (5min)"];
                const latestTime = Object.keys(timeSeries)[0];
                const latestData = timeSeries[latestTime];
                setPrediction({
                    time: latestTime,
                    open: latestData["1. open"],
                    high: latestData["2. high"],
                    low: latestData["3. low"],
                    close: latestData["4. close"],
                });
            } else {
                setError("No data found for the given symbol.");
            }
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Financial Prediction</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                />
                <button onClick={fetchPrediction} disabled={loading}>
                    {loading ? "Loading..." : "Get Prediction"}
                </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {prediction && (
                <div>
                    <h2>Prediction for {symbol.toUpperCase()}</h2>
                    <p>Time: {prediction.time}</p>
                    <p>Open: {prediction.open}</p>
                    <p>High: {prediction.high}</p>
                    <p>Low: {prediction.low}</p>
                    <p>Close: {prediction.close}</p>
                </div>
            )}
        </div>
    );
};

export default AIApi;
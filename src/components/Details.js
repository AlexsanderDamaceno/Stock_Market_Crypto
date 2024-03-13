import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const CryptoDetails = () => {

  const { id } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState('1d');
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);

  


  //  get the  crypto info 
  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}` , {
          baseURL: 'https://api.allorigins.win/raw?url=https://api.coingecko.com/api/v3',
          withCredentials: false,
        });
        setCryptoDetails(response.data);
      } catch (error) {
        console.error('Error fetching crypto details:', error);
      }
    };

    fetchCryptoDetails();
  }, [id]);



  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: selectedPeriod,
          },
          baseURL: 'https://api.allorigins.win/raw?url=https://api.coingecko.com/api/v3',
          withCredentials: false,
        });

        setPriceHistory(response.data.prices);
      } catch (error) {
        console.error('Error fetching price history:', error);
      }
    };




    if (id) {
      fetchPriceHistory();
    }
  }, [id, selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const renderChartOptions = () => {
    const options = ['1d', '7d', '30d', '90d', '180d', '365d', 'max'];
    return (
      <select value={selectedPeriod} onChange={(e) => handlePeriodChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  };

  const chartData = {
    labels: priceHistory.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: priceHistory.map(([, price]) => price),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  if (!cryptoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">{cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()})</h1>
      <h2 className="text-2xl font-semibold mb-4">Price History</h2>
      {renderChartOptions()}
      <Line data={chartData} />
    </div>
  );


};

export default CryptoDetails;
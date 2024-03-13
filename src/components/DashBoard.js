import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {styled} from '@mui/styles';
import CryptoTable from './Table.js';

import { useNavigate } from 'react-router-dom';


const handleCellClick = (id) => {
  const name = "bitcoin";
 // navigate('/coins/bitcoin');
};    



const CryptoPriceTracker = () => {


    axios.defaults.withCredentials = true;


    const [cryptoData, setCryptoData] = useState([]);

  
    useEffect(() => {
      const fetchCryptoData = async () => {
        
          const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
              vs_currency: 'usd',
              per_page: 100, 
            },

             withCredentials: false,
             baseURL: 'https://api.allorigins.win/raw?url=https://api.coingecko.com/api/v3',
          }).then(res => {
            setCryptoData(res.data)
           
           }).catch(error => console.log(error))
      
      };
  
      fetchCryptoData();
    }, []);
  

    return (

   
      <div className="text-blue-600 text min-h-screen p-8">
     
          <div className="mr-4 flex items-center">       
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" alt="Image" className="w-12 h-auto mr-2" />
            <h1 className="text-black text-4xl font-bold mb-0">Crypto Price Tracker</h1>
          </div>
        
          <CryptoTable cryptoData={cryptoData} />
      </div>
      
    );
  };
  
  export default CryptoPriceTracker;
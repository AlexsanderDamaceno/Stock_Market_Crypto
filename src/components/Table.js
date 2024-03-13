import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



import { useNavigate } from 'react-router-dom';



const CryptoTable = ({ cryptoData }) => {


    const navigate = useNavigate();

    const handleCellClick = (id) => {
        const url = 'coins/' + id.toLowerCase();
        navigate(url);
    };    

    const getPriceChangeColor = (percentage) => 
    {
        return percentage >= 0 ? 'text-green-500' : 'text-red-500';
    };
      
    
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price (USD)</TableCell>
              <TableCell>Price Change (24h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { cryptoData.map((crypto, index) => (
              <TableRow key={index} onClick={() => handleCellClick(crypto.name)}>
                <TableCell>
                 
                    <img src={crypto.image} alt={crypto.symbol} style={{ width: '24px', height: '24px' }} />
                
                </TableCell>
                <TableCell>{crypto.name}</TableCell>
                <TableCell>${crypto.current_price}</TableCell>
                <TableCell>
                  <div className={`${getPriceChangeColor(crypto.price_change_percentage_24h)}`}>
                  {crypto.price_change_percentage_24h > 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  export default CryptoTable;
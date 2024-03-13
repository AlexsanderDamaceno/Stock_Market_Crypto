import logo from './logo.svg';
import './App.css';
import CryptoPriceTracker from './components/DashBoard.js';
import CryptoDetails from './components/Details.js';
import Switch from "react-switch";
import {Routes, Route, Router} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

function App() 
{
  return (
    <div className="App">
   
    <Routes>
      <Route path="/" element={<CryptoPriceTracker />} />
      <Route path="/coins/:id" element={<CryptoDetails />} />
    </Routes>
  
     
    </div>
  );
}

export default App;

import './App.css';
import MenuPage from './pages/Menu/MenuPage'
import KltcPage from './pages/Kltc_linux/Kltc';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react';

const generateTrafficData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    timestamp: `${i}:00`,
    throughput: 120 + Math.sin(i / 3) * 40 + Math.random() * 20,
    latency: 40 + Math.cos(i / 2) * 15 + Math.random() * 10,
  }));
};



function App() {
  const [trafficData] = useState(generateTrafficData());
  return (
    <Router>
          <Routes>
              <Route path="/menu" element={<MenuPage data={trafficData}/>} />
              <Route path="/kltc" element={<KltcPage />}></Route>
          </Routes>
      </Router>
  )
}

export default App

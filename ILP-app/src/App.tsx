import './App.css';
import MenuPage from './pages/Menu/MenuPage'
import KltcPage from './pages/Kltc_linux/Kltc';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <Router>
          <Routes>
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/kltc" element={<KltcPage />}></Route>
          </Routes>
      </Router>
  )
}

export default App

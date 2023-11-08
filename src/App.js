import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Footer from './components/Footjer';


function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

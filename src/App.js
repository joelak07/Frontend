import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';


function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

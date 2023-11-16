import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Appointment from './components/Appointment';
import Home from './components/Home';
import Footer from './components/Footjer';
import Status from './components/Status';
import Error from './components/Error';
import Otp from './components/Otp';
import VerifiedStatus from './components/VerifiedStatus';
import AdminDashboard from './components/AdminDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/status" element={ <Status /> } />
          <Route path="/appointment" element={ <Appointment/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/*" element={ <Error/>} />
          <Route path="/patient/otp" element={ <Otp /> } />
          <Route path="/verifiedStatus" element={<VerifiedStatus />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

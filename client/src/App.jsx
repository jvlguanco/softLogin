import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import OTP from './pages/otp/OTP';
import Register from './pages/register/Register';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/otp" element={<OTP/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
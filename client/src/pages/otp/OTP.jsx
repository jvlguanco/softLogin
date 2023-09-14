import './otp.css'
import { AuthContext } from '../../components/context/AuthContext'
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"


const OTP = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [otpInput, setOtpInput] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setOtpInput(e.target.value);
        setError('');
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (otpInput == user.otp) {
            dispatch({type: 'LOGIN_SUCCESS', payload: user});
            navigate('/');
        } else {
            setError('Wrong OTP! Please try again.');
        }
    };

    return (
        <div className="otp">
            {user ? (
                <div className="otpContainer">
                    <h1>Input your OTP</h1>
                    <input type="text" placeholder="OTP" id="otp" onChange={handleChange} className='input'/>
                    <button onClick={handleClick} className="otpButton">Verify</button>
                    {error && <span>{error}</span>}
                </div>
            ) : (
                <div>
                    <h1>Go Back!</h1>
                </div>
            )}
        </div>
    )
}

export default OTP
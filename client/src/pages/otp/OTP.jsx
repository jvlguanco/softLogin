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
            setError('Wrong OTP. Please try again.');
        }
    };

    return (
        <div className="otp">
            {user ? (
                <div className="otpContainer">
                    <input type="text" placeholder="OTP" id="otp" onChange={handleChange} className='input'/>
                    <button onClick={handleClick} className="otpButton">Verify</button>
                </div>
            ) : (
                <div>
                    <h1>Go Back!</h1>
                </div>
            )}
            {error && <span>{error}</span>}
        </div>
    )
}

export default OTP
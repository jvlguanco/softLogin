import { AuthContext } from '../../components/context/AuthContext'
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"


const OTP = () => {
    const { user } = useContext(AuthContext);
    const [otpInput, setOtpInput] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setOtpInput(e.target.value);
        setError('');
    };

    const handleClick = async (e) => {
        e.preventDefault();
        console.log('handleClick triggered');
        console.log(otpInput)
        console.log(user.otp)
        if (otpInput == user.otp) {
            navigate('/');
        } else {
            setError('Wrong OTP. Please try again.');
        }
    };

    return (
        <div className="otp">
            {user && (
                <div className="otpContainer">
                    <input type="text" placeholder="OTP" id="otp" onChange={handleChange} className='input'/>
                    <button onClick={handleClick} className="otpButton">Verify</button>
                </div>
            )}
            {error && <span>{error}</span>}
        </div>
    )
}

export default OTP
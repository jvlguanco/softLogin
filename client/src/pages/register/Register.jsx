import './register.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { userInputs } from "../../formSource"
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setInfo(prev=>({...prev, [e.target.id]: e.target.value}));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", info);
            navigate('/login');
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div className="register">
            <div className="rContainer">
                <h1>Registration</h1>
                {userInputs.map((input) =>(
                    <div className="rInput" key={input.id}>
                        <label>{input.label}</label>
                        <input onChange={handleChange} id={input.id} type={input.type} placeholder={input.placeholder} />
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Register</button>
                <button onClick={()=>{navigate('/login')}} className="rButton">Login</button>
                <button onClick={()=>{navigate('/')}} className="rButton">Home</button>
            </div>
        </div>
    )
}

export default Register


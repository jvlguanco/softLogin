import './home.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../components/context/AuthContext'

const Home = () => {
    const { isVerified, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch({type: 'LOGOUT'});
    }

    return (
        <div className="home">
            { !isVerified ? (
                    <div className="homeItems">
                        <h1>Welcome!</h1>
                        <button onClick={() => { navigate('/register')}} className="homeButton">Register</button>
                        <button onClick={() => { navigate('/login')}} className="homeButton">Login</button>
                    </div>
                ) : (
                <div className="homeItems">
                    <h1>Login Success</h1>
                    <button onClick={handleLogout} className="homeButton">Logout</button>
                </div>)}
        </div>
    )
}

export default Home
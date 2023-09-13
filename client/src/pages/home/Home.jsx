import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../components/context/AuthContext'

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('user');
        window.location.reload()
        navigate('/');
    }

    return (
        <div className="home">
            {!user ? (
                    <div className="homeItems">
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
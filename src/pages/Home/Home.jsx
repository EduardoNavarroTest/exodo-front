import Navbar from '../../components/Navbar/Navbar.jsx'
import { useAuth } from '../../context//AuthContext.jsx';

const Home = () => {
    const { logout } = useAuth();
    return (
        <>
            <Navbar />
            <h1>Estoy en el home</h1>
        </>
    )
}

export default Home;
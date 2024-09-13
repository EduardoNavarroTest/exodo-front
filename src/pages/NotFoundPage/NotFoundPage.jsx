import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Error 404</h1>
          <p className="text-gray-600">Página no encontrada</p>
          <Link to="/home" className="text-blue-500 hover:underline">
            Volver a la página principal
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;

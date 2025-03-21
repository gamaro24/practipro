import "../../App.css";
import "./home.css";
//import { Login } from "../../components/Login/Login";
import { Footer } from "../../components/Footer/Footer";
import { AppContext } from "../../context/App/AppContext";
import { isAuthenticated } from "../../helpers/helpers";
import Navbar from "../NavBar/NavBar";

const Home = ({ children }) => {
    return (
        <>
          <div className="">
              <div className="show-menu-desktop h-100">
                    <div>
                        <Navbar></Navbar>
                        <div className="p-2"></div>
                        {children}
                        <Footer></Footer>
                    </div>
              </div>
          </div>
        </>
      );
    };
    
    export default Home;
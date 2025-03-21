import "../../App.css";
import "./logout.css";
import { Footer } from "../Footer/Footer";
import { AppContext } from "../../context/App/AppContext";
import { isAuthenticated } from "../../helpers/helpers";
import Navbar from "../NavBar/NavBar";

const Logout = () => {
    return (
        <>
          <div className="">
              <div className="show-menu-desktop h-100">
                    <div>
                        <h1>Cerro Sesión</h1>
                    </div>
              </div>
          </div>
        </>
      );
    };
    
  export default Logout;
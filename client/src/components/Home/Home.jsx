import "./home.css";
import { Footer } from "../../components/Footer/Footer";

import Navbar from "../NavBar/NavBar";

const Home = ({ children }) => {
    return (
        <>
          <div className="">
              <div className="h-100">
                    <div>
                        <Navbar></Navbar>
                        <div className="mb-4"></div>
                        {children}
                    </div>
              </div>
              <Footer></Footer>
          </div>
        </>
      );
    };
    
    export default Home;
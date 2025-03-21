import Home from "../src/components/Home/Home";
import Login from "../src/components/Login/Login";
import { Routes, Route } from "react-router-dom";

const App = () => {
  {console.log('ESTO NO SE USA.jsx')}
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

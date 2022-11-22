import "./App.css";
import Home from "./pages/home/Home";

import { Routes, Route } from "react-router-dom";
import UpdateProduct from "./pages/update/UpdateProduct";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

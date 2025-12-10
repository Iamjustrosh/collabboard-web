import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Downloads from "./pages/Downloads";
import Docs from "./pages/Docs";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

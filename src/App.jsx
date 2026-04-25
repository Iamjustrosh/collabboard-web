import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Downloads from "./pages/Downloads";
import Docs from "./pages/Docs";
import Changelog from "./pages/Changelog";
import Ppt from "./pages/Ppt";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/docs"      element={<Docs />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/ppt"       element={<Ppt />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
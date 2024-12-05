import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import Survey from "./components/Survey";

function App() {

  const show = 0

  return (
    <div>
      {show === 1 ? (
        <Survey />
      ) : (
        <BrowserRouter>
          <div className="relative z-0 bg-primary overflow-x-hidden">
            <Navbar />
            <Hero />
            <FAQ />
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

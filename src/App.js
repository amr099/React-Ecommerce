import "./App.css";
import { Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Products from "./Pages/Products";
import Footer from "./Components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path='/' element={<Products />} />
                <Route path='product/:id' element={<ProductDetails />} />
                <Route path='checkout' element={<Checkout />} />
                <Route path='*' element={<Products />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;

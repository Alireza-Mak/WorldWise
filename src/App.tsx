import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/product" element={<Product />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="app" element={<AppLayout />}>
                    <Route index element={<CityList />} />
                    <Route path="cities" element={<p>cities</p>} />
                    <Route path="countries" element={<p>countries</p>} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

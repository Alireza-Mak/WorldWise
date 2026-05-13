import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import type { CitiesType } from "./types/types";
const URL = "http://localhost:9000/cities";
function App() {
    const [cities, setCities] = useState<CitiesType>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(function () {
        (() => setIsLoading(true))();
        async function fetchCities() {
            try {
                const res = await fetch(URL);
                if (!res.ok)
                    throw new Error(`${res.status}: ${res.statusText}`);
                const data = await res.json();
                setCities(data);
            } catch (error) {
                alert(error);
            } finally {
                setIsLoading(false);
            }
        }
        const id = setTimeout(() => fetchCities(), 500);
        return () => clearTimeout(id);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/product" element={<Product />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="app" element={<AppLayout />}>
                    <Route
                        index
                        element={
                            <CityList isLoading={isLoading} cities={cities} />
                        }
                    />
                    <Route path="cities" element={<p>cities</p>} />
                    <Route path="countries" element={<p>countries</p>} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

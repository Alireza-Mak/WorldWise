import { lazy, Suspense } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

const Product = lazy(() => import("./pages/Product"));
const Homepage = lazy(() => import("./pages/Homepage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

import CountryList from "./components/CountryList";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage/> }>
                        <Routes>
                            <Route index element={<Homepage />} />
                            <Route path="product" element={<Product />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route path="login" element={<Login />} />
                            <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                                <Route index element={<Navigate replace to="cities" />} />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route path="form" element={<Form />} />
                                <Route path="countries" element={<CountryList />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>   
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;

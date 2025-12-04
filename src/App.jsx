import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CitiesProvider } from "./context/CitiesContext";
import { CityProvider } from "./context/CityContext";
import { AuthProvider } from "./context/FakeAuthContext";

import ProtectedRoute from "./pages/ProtectedRoute";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/ContryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import SpinnerFullPage from "./components/Spinner/SpinnerFullPage";

/* import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound"; */

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<CitiesProvider>
					<CityProvider>
						<Suspense fallback={<SpinnerFullPage />}>
							<Routes>
								<Route path="/" element={<Homepage />} />
								<Route path="product" element={<Product />} />
								<Route path="pricing" element={<Pricing />} />
								<Route path="*" element={<PageNotFound />} />
								<Route
									path="app"
									element={
										<ProtectedRoute>
											<AppLayout />
										</ProtectedRoute>
									}
								>
									<Route index element={<Navigate replace to="cities" />} />
									<Route path="cities" element={<CityList />} />
									<Route path="cities/:id" element={<City />} />
									<Route path="countries" element={<CountryList />} />
									<Route path="form" element={<Form />} />
								</Route>
								<Route path="/login" element={<Login />} />
							</Routes>
						</Suspense>
					</CityProvider>
				</CitiesProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;

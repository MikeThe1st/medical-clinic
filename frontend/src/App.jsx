import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Test from "./pages/Test.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Reg from "./pages/Reg.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Main />} path="/" />
				<Route element={<Test />} path="/test" />
				<Route element={<Admin />} path="/Admin" />
				<Route element={<Login />} path="/Login" />
				<Route element={<Reg />} path="/Registration " />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
//hello

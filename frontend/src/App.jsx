import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main.jsx'
import Test from "./pages/Test.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import UserPage from "./pages/UserPage.jsx";
import Registration from "./pages/Registration.jsx";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Main />} path="/" />
				<Route element={<Test />} path="/test" />
				<Route element={<Login />} path="/Login" /> 
				<Route element={<Admin />} path="/Admin" />
				<Route element={<UserPage />}path="/UserPage"/>
				<Route element={<Registration />}path="/Registration"/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
//hello

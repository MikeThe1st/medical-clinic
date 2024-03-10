import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contact from './pages/Contact.jsx'
import Test from "./pages/Test.jsx";
import Main from "./pages/Main.jsx";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Main />} path="/" />
				<Route element={<Test />} path="/test" />
				<Route element={<Contact />} path="/contact" />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
//hello
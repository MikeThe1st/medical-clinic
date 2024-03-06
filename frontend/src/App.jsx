import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main.jsx'
import Test from "./pages/Test.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Main />} path="/" />
				<Route element={<Test />} path="/test" />
			</Routes>
		</BrowserRouter>
	)
}

export default App;

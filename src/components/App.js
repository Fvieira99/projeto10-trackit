import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "../reset.css";
import TodayHabitsContext from "../contexts/TodayHabitsContext";
import HabitsContext from "../contexts/HabitsContext";
import UserContext from "../contexts/UserContext";
import Home from "./home/Home";
import CreateAccount from "./createaccount/CreateAccount";
import Habits from "./habits/Habits";
import Today from "./today/Today";
import Historic from "./historic/Historic";

function App() {
	const [userInfo, setUserInfo] = useState({});
	const [habits, setHabits] = useState([]);
	const [todayHabits, setTodayHabits] = useState([]);
	const [todayHabitsCount, setTodayHabitsCount] = useState(0);
	const [count, setCount] = useState(0);
	const [percentage, setPercentage] = useState(0);

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			<HabitsContext.Provider value={{ habits, setHabits }}>
				<TodayHabitsContext.Provider
					value={{
						todayHabits,
						setTodayHabits,
						count,
						setCount,
						percentage,
						setPercentage,
						todayHabitsCount,
						setTodayHabitsCount,
					}}
				>
					<BrowserRouter>
						<GlobalStyle />
						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route path="/cadastro" element={<CreateAccount />}></Route>
							<Route path="/habitos" element={<Habits />}></Route>
							<Route path="/hoje" element={<Today />}></Route>
							<Route path="/historico" element={<Historic />}></Route>
						</Routes>
					</BrowserRouter>
				</TodayHabitsContext.Provider>
			</HabitsContext.Provider>
		</UserContext.Provider>
	);
}

export default App;

const GlobalStyle = createGlobalStyle`
	body{
		box-sizing: border-box;
		font-family: "Lexend Deca";
	}	

`;

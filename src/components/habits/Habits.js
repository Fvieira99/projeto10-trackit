import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { BsFillPlusSquareFill } from "react-icons/bs";

import { Wrapper, Container, Title, Text } from "./styled/HabitsStyled";
import TodayHabitsContext from "../../contexts/TodayHabitsContext";
import HabitsContext from "../../contexts/HabitsContext";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import CreateHabit from "./CreateHabit";
import Habit from "./Habit";
import Footer from "../Footer";

function Habits() {
	const { percentage } = useContext(TodayHabitsContext);
	const { habits } = useContext(HabitsContext);
	const [apiHabits, setApiHabits] = useState(null);
	const [isCreatingHabit, setIsCreatingHabit] = useState(0);
	const { userInfo } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	useEffect(() => {
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

		if (userInfo.token) {
			const promise = axios.get(URL, config);

			promise.then((response) => {
				setApiHabits(response.data);
			});
			promise.catch((err) => {
				console.log(err.response);
			});
		}
	}, [habits, userInfo]);

	function showHabitForm() {
		return (
			<CreateHabit
				setIsCreatingHabit={setIsCreatingHabit}
				isCreatingHabit={isCreatingHabit}
			/>
		);
	}

	function showHabits() {
		if (apiHabits) {
			return apiHabits.map((habit, index) => {
				return (
					<Habit
						key={(habit.name, index)}
						name={habit.name}
						days={habit.days}
						id={habit.id}
						apiHabits={apiHabits}
					></Habit>
				);
			});
		} else {
			return (
				<Text>
					Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
					começar a trackear!
				</Text>
			);
		}
	}

	return (
		<Wrapper>
			<Header />
			<Container>
				<Title>
					<span>Meus Hábitos</span>
					<div
						onClick={() => {
							setIsCreatingHabit(1);
						}}
					>
						<BsFillPlusSquareFill color="#52B6FF" size="35px" />
					</div>
				</Title>
				{showHabitForm()}
				{showHabits()}
			</Container>
			<Footer percentage={percentage} />
		</Wrapper>
	);
}

export default Habits;

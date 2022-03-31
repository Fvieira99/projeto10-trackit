import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { BsFillPlusSquareFill } from "react-icons/bs";

import HabitsContext from "../../contexts/HabitsContext";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import CreateHabit from "./CreateHabit";
import Habit from "./Habit";
import Footer from "../Footer";

function Habits() {
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
				console.log(response);
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
			<Footer />
		</Wrapper>
	);
}

export default Habits;

const Wrapper = styled.div`
	min-height: calc(100vh);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #e5e5e5;
`;

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 120px;
`;

const Title = styled.div`
	margin-top: 91px;
	margin-bottom: 20px;
	width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	span {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 23px;
		line-height: 29px;
		color: #126ba5;
	}

	div {
		width: 51px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 4.63636px;
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 27px;
	}
`;

const Text = styled.span`
	width: 90%;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	color: #666666;
	line-height: 22px;
`;

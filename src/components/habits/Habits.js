import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import HabitsContext from "../../contexts/HabitsContext";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import CreateHabit from "./CreateHabit";

function Habits() {
	const { habits, setHabits } = useContext(HabitsContext);
	const [isCreatingHabit, setIsCreatingHabit] = useState(0);
	const { userInfo, setUserInfo } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	function showHabitForm() {
		if (isCreatingHabit) {
			return <CreateHabit setIsCreatingHabit={setIsCreatingHabit} />;
		}
		return <></>;
	}

	function showHabits() {
		if (habits.length > 0) {
			return <span>Aqui vai um hábito</span>;
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
		<Container>
			<Header />
			<Title>
				<span>Meus Hábitos</span>
				<button
					onClick={() => {
						setIsCreatingHabit(1);
					}}
				>
					<span>+</span>
				</button>
			</Title>
			{showHabitForm()}
			{showHabits()}
		</Container>
	);
}

export default Habits;

const Container = styled.div`
	min-height: calc(100vh);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #e5e5e5;
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
		color: #126ba5;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 35px;
		background-color: #52b6ff;
		border: none;
		border-radius: 4.63636px;
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 27px;
		color: #ffffff;
	}
	button span {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 27px;
		color: #ffffff;
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

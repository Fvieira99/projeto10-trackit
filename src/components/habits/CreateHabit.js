import axios from "axios";
import { useState, useContext } from "react";
import styled from "styled-components";

import HabitsContext from "../../contexts/HabitsContext";
import UserContext from "../../contexts/UserContext";

function CreateHabit({ setIsCreatingHabit }) {
	const [newHabitInfo, setNewHabitInfo] = useState({ name: "", days: [] });
	const weekdays = ["D", "S", "T", "Q", "S", "S"];
	const [isLoading, setIsLoading] = useState(false);
	const { userInfo } = useContext(UserContext);
	const { habits, setHabits } = useContext(HabitsContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	console.log(newHabitInfo);

	function sendNewHabit() {
		console.log(newHabitInfo);
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

		if (newHabitInfo.days.length > 0 && newHabitInfo.name.length > 0) {
			const promise = axios.post(URL, newHabitInfo, config);

			promise.then((response) => {
				console.log(response);
				setHabits([...habits, response.data]);
				setIsCreatingHabit(0);
			});
			promise.catch((err) => {
				console(err.response);
				alert("Preencha os dados corretamente");
				setIsLoading(false);
				setNewHabitInfo({ name: "", days: [] });
			});
		}
	}

	function toggleDay(index) {
		const selected = newHabitInfo.days.some((number) => number === index);
		if (!selected) {
			setNewHabitInfo({ ...newHabitInfo, days: [...newHabitInfo.days, index] });
		} else {
			const newSelected = newHabitInfo.days.filter(
				(number) => number !== index
			);
			setNewHabitInfo({ ...newHabitInfo, days: newSelected });
		}
	}

	function createWeekdays() {
		return weekdays.map((weekday, index) => {
			return (
				<Weekday
					isLoading={isLoading}
					key={index}
					days={newHabitInfo.days}
					i={index}
					onClick={() => {
						toggleDay(index);
					}}
				>
					{weekday}
				</Weekday>
			);
		});
	}

	return (
		<Wrapper>
			<ContainerForm>
				<Input
					isLoading={isLoading}
					disabled={isLoading}
					value={newHabitInfo.name}
					onChange={(e) => {
						setNewHabitInfo({ ...newHabitInfo, name: e.target.value });
					}}
					placeholder="nome do hábito"
				></Input>
				<div>{createWeekdays()}</div>
			</ContainerForm>
			<ContainerOptions>
				<span
					onClick={() => {
						setIsCreatingHabit(0);
					}}
				>
					Cancelar
				</span>
				<Button
					isLoading={isLoading}
					onClick={() => {
						setIsLoading(true);
						sendNewHabit();
					}}
				>
					Salvar
				</Button>
			</ContainerOptions>
		</Wrapper>
	);
}

export default CreateHabit;

const Wrapper = styled.div`
	width: 90%;
	height: 180px;
	background-color: #fff;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const ContainerForm = styled.form`
	width: 90%;
	margin: 15px auto 0 auto;

	div {
		margin-top: 4px;
		display: flex;
		gap: 4px;
	}
`;

const Weekday = styled.div`
	pointer-events: ${(props) => (props.isLoading ? "none" : "all")};
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #d4d4d4;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 19.976px;
	color: ${(props) =>
		props.days.some((number) => number === props.i) ? "#FFFFFF" : "#CFCFCF"};

	border-radius: 5px;
	background-color: ${(props) =>
		props.days.some((number) => number === props.i) ? "#CFCFCF" : "#FFFFFF"};
`;

const ContainerOptions = styled.div`
	width: 90%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin: 0 auto 15px auto;
	gap: 23px;

	span {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		color: #52b6ff;
	}
	button {
	}
`;

const Input = styled.input`
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	text-indent: 5px;
	width: 100%;
	height: 45px;
	border: 1px solid #d4d4d4;
	border-radius: 5px;
	background-color: ${(props) => (props.isLoading ? "#f2f2f2" : "#ffffff;")};

	::placeholder {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		color: #dbdbdb;
	}
`;

const Button = styled.button`
	width: 84px;
	height: 35px;
	background-color: #52b6ff;
	opacity: ${(props) => (props.isLoading ? "0.7" : "1")};
	border: none;
	border-radius: 4.5px;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	color: #ffffff;
`;

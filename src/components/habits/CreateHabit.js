import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

function CreateHabit({ setIsCreatingHabit }) {
	const [newHabitInfo, setNewHabitInfo] = useState({ name: "", days: [] });
	const [weekdaysIndex, setWeekdaysIndex] = useState([]);
	const weekdays = ["D", "S", "T", "Q", "S", "S"];
	const [isLoading, setIsLoading] = useState(0);
	const { userInfo } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	function sendNewHabit() {
		console.log(newHabitInfo);
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

		if (newHabitInfo.days.length > 0 && newHabitInfo.name.length > 0) {
			const promise = axios.post(URL, newHabitInfo, config);

			promise.then((response) => {
				console.log(response);
				setIsCreatingHabit(0);
			});
			promise.catch((err) => {
				console(err.response);
				alert("Preencha os dados corretamente");
				setIsLoading(0);
				setWeekdaysIndex([]);
				setNewHabitInfo({ name: "", days: [] });
			});
		}
	}

	function toggleDay(index) {
		const selected = weekdaysIndex.some((number) => number === index);
		if (!selected) {
			setWeekdaysIndex([...weekdaysIndex, index]);
		} else {
			const newSelected = weekdaysIndex.filter((number) => number !== index);
			setWeekdaysIndex(newSelected);
		}
	}

	function createWeekdays() {
		return weekdays.map((weekday, index) => {
			return (
				<Weekday
					key={index}
					days={weekdaysIndex}
					index={index}
					onClick={() => {
						toggleDay(index);
						setNewHabitInfo({ ...newHabitInfo, days: [...weekdaysIndex] });
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
				<input
					value={newHabitInfo.name}
					onChange={(e) => {
						setNewHabitInfo({ ...newHabitInfo, name: e.target.value });
					}}
					placeholder="nome do hábito"
				></input>
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
				<button
					onClick={() => {
						setIsLoading(1);
						sendNewHabit();
					}}
				>
					Salvar
				</button>
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
`;

const ContainerForm = styled.form`
	width: 90%;
	margin: 15px auto 0 auto;
	input {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		text-indent: 5px;
		width: 100%;
		height: 45px;
		border: 1px solid #d4d4d4;
		border-radius: 5px;
	}
	input::placeholder {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		color: #dbdbdb;
	}
	div {
		margin-top: 4px;
		display: flex;
		gap: 4px;
	}
`;

const Weekday = styled.div`
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
		props.days.some((number) => number === props.index)
			? "#FFFFFF"
			: "#CFCFCF"};

	border-radius: 5px;
	background-color: ${(props) =>
		props.days.some((number) => number === props.index)
			? "#CFCFCF"
			: "#FFFFFF"};
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
		width: 84px;
		height: 35px;
		background: #52b6ff;
		border: none;
		border-radius: 4.5px;
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		color: #ffffff;
	}
`;

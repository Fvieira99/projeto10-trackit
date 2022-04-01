import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useContext } from "react";

import TodayHabitsContext from "../../contexts/TodayHabitsContext";
import Footer from "../Footer";
import TodayHabit from "./TodayHabit";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import axios from "axios";

function Today() {
	const {
		todayHabits,
		setTodayHabits,
		count,
		setCount,
		percentage,
		setPercentage,
	} = useContext(TodayHabitsContext);
	const { userInfo } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	// console.log(config);

	require("dayjs/locale/pt-br");
	const date = dayjs().locale("pt-br").format("dddd, DD/MM");
	const dayIndex = dayjs().day();
	// console.log(dayIndex);

	// const [habits, setHabits] = useState(null);

	useEffect(() => {
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

		if (userInfo.token) {
			const promise = axios.get(URL, config);
			// console.log("mandei a requisição");
			promise.then((response) => {
				const { data } = response;
				// console.log(data);
				setTodayHabits(data);
				setCount(data.filter((habit) => habit.done).length);
				setPercentage((count / data.length) * 100);
			});

			promise.catch((err) => console.log(err.response));
		}
	}, [userInfo, count]);

	console.log(count);
	console.log(percentage);
	// console.log(todayHabits, "sou a array habits");

	function showTodayHabits() {
		if (todayHabits) {
			return (
				<Habits>
					{todayHabits.map((habit, index) => {
						const { name, done, currentSequence, highestSequence, id } = habit;
						return (
							<TodayHabit
								i={index}
								name={name}
								done={done}
								current={currentSequence}
								highest={highestSequence}
								id={id}
							/>
						);
					})}
				</Habits>
			);
		}
		return <></>;
	}

	return (
		<Container>
			<Header />
			<Date>{date}</Date>
			<Text count={count}>
				{count > 0
					? `${percentage}% dos hábitos concluídos`
					: "Nenhum hábito concluído ainda"}
			</Text>
			{showTodayHabits()}
			<Footer percentage={percentage} />
		</Container>
	);
}

export default Today;

const Container = styled.div`
	background-color: #e5e5e5;
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Date = styled.h1`
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 23px;
	color: #126ba5;
	width: 90%;
	margin-top: 100px;
`;

const Habits = styled.div`
	margin-top: 30px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
`;

const Text = styled.span`
	width: 90%;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 17.976px;
	line-height: 22px;
	color: ${(props) => (props.count > 0 ? "#8FC549;" : "#bababa;")};
	margin-top: 5px;
`;

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useContext } from "react";

import Footer from "../Footer";
import check from "../../assets/Group.png";
import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import axios from "axios";

function Today() {
	const { userInfo } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	console.log(config);

	const date = dayjs().locale("pt-br").format("dddd, DD/MM");

	const [habits, setHabits] = useState(null);

	useEffect(() => {
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

		if (userInfo.token) {
			const promise = axios.get(URL, config);
			console.log("mandei a requisição");
			promise.then((response) => {
				const { data } = response;
				console.log(data);
				setHabits(data);
			});

			promise.catch((err) => console.log(err.response));
		}
	}, [userInfo]);

	function showTodayHabits() {
		if (habits) {
			return (
				<Habits>
					{habits.map((habit) => {
						return (
							<Habit>
								<div>
									<span>{habit.name}</span>
									<div>
										<span>Sequência Atual: {habit.currentSequence} dias</span>
										<span>Seu recorder: {habit.highestSequence} dias</span>
									</div>
								</div>
								<CheckBox>
									<img src={check} alt="check-icon" />
								</CheckBox>
							</Habit>
						);
					})}
				</Habits>
			);
		}
	}

	return (
		<Container>
			<Header />
			<Date>{date}</Date>
			<Footer />
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

const Date = styled.div`
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 23px;
	color: #126ba5;
	width: 90%;
	margin-top: 100px;
`;

const Habits = styled.div``;

const Habit = styled.div``;

const CheckBox = styled.div``;

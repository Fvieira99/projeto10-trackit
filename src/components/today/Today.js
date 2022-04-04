import { useEffect } from "react";
import dayjs from "dayjs";
import { useContext } from "react";

import { Container, Date, Habits, Text } from "./TodayStyled";
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

	require("dayjs/locale/pt-br");
	const date = dayjs().locale("pt-br").format("dddd, DD/MM");

	useEffect(() => {
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

		if (userInfo.token) {
			const promise = axios.get(URL, config);

			promise.then((response) => {
				const { data } = response;
				setTodayHabits(data);
				setCount(data.filter((habit) => habit.done).length);
				setPercentage(((count / data.length) * 100).toFixed(0));
			});

			promise.catch((err) => console.log(err.response));
		}
	}, [userInfo, count]);

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

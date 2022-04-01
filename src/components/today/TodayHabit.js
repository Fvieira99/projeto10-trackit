import styled from "styled-components";
import { BsCheckSquareFill } from "react-icons/bs";
import { useContext, useState } from "react";
import axios from "axios";

import {
	Wrapper,
	Container,
	Habit,
	CurrentCount,
	HighestCount,
} from "./TodayHabitStyled";
import UserContext from "../../contexts/UserContext";
import TodayHabitsContext from "../../contexts/TodayHabitsContext";

function TodayHabit(props) {
	const { name, done, highest, current, id } = props;
	const { count, setCount } = useContext(TodayHabitsContext);
	const { userInfo } = useContext(UserContext);
	const [sequence, setSequence] = useState({
		highest: highest,
		current: current,
	});
	const [isDone, setIsDone] = useState(done);

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	function sendRequest(URL) {
		if (isDone) {
			const promise = axios.post(URL, {}, config);
			promise.then((response) => {
				setCount(count - 1);
				if (sequence.highest > sequence.current) {
					setSequence({
						...sequence,
						current: sequence.current - 1,
					});
				} else if (sequence.highest === sequence.current) {
					setSequence({
						highest: sequence.highest - 1,
						current: sequence.current - 1,
					});
				}
				setIsDone(false);
			});
			promise.catch((err) => {});
		} else if (!isDone) {
			const promise = axios.post(URL, {}, config);
			promise.then((response) => {
				setCount(count + 1);
				if (sequence.highest > sequence.current) {
					setSequence({
						...sequence,
						current: sequence.current + 1,
					});
				} else if (sequence.highest === sequence.current) {
					setSequence({
						highest: sequence.highest + 1,
						current: sequence.current + 1,
					});
				}
				setIsDone(true);
			});
			promise.catch((err) => {});
		}
	}

	function toggleDoneHabit() {
		if (isDone && userInfo.token) {
			const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
			sendRequest(URL);
		} else if (!isDone && userInfo.token) {
			const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check `;
			sendRequest(URL);
		}
	}

	return (
		<Wrapper>
			<Container>
				<Habit>
					<span>{name}</span>
					<div>
						<CurrentCount isDone={isDone}>
							<h2>Sequência Atual:</h2> <span>{sequence.current} dias</span>
						</CurrentCount>

						<HighestCount
							highest={sequence.highest}
							current={sequence.current}
							isDone={isDone}
						>
							<h2>Seu recorde:</h2> <span>{sequence.highest} dias</span>
						</HighestCount>
					</div>
				</Habit>

				<BsCheckSquareFill
					onClick={toggleDoneHabit}
					color={isDone ? "#8FC549" : "#EBEBEB"}
					size="70px"
				/>
			</Container>
		</Wrapper>
	);
}

export default TodayHabit;

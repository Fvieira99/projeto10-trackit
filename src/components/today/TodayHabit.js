import styled from "styled-components";
import { BsCheckSquareFill } from "react-icons/bs";
import { useContext, useState } from "react";
import axios from "axios";

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
				// console.log(response.data);
				setCount(count - 1);
				setSequence({
					highest: sequence.highest - 1,
					current: sequence.current - 1,
				});
				setIsDone(false);
			});
			promise.catch((err) => {
				console.log(err.data);
			});
		} else if (!isDone) {
			const promise = axios.post(URL, {}, config);
			promise.then((response) => {
				// console.log(response.data);
				setCount(count + 1);
				setSequence({
					highest: sequence.highest + 1,
					current: sequence.current + 1,
				});
				setIsDone(true);
			});
			promise.catch((err) => {
				console.log(err.data);
			});
		}
	}

	function toggleDoneHabit() {
		if (isDone && userInfo.token) {
			// console.log(userInfo.token);
			// console.log("vou desmarcar");
			const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
			sendRequest(URL);
		} else if (!isDone && userInfo.token) {
			// console.log(userInfo.token);
			// console.log("vou marcar");
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

						<HighestCount highest={sequence.highest} current={sequence.current}>
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

const Wrapper = styled.div`
	width: 90%;
	height: 94px;
	border-radius: 5px;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Habit = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	gap: 7px;

	span {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 19.976px;
		line-height: 25px;
		color: #666666;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
`;

const CurrentCount = styled.span`
	display: flex;
	align-items: center;
	gap: 5px;

	span,
	h2 {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 12.976px;
		line-height: 16px;
	}
	h2 {
		color: #666666;
	}

	span {
		color: ${(props) => (props.isDone ? "#8FC549" : "#666666")};
	}
`;

const HighestCount = styled.span`
	display: flex;
	align-items: center;
	gap: 5px;

	span,
	h2 {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 12.976px;
		line-height: 16px;
	}
	h2 {
		color: #666666;
	}
	span {
		color: ${(props) =>
			props.highest === props.current && props.highest !== 0
				? "#8FC549;"
				: "#666666;"};
	}
`;

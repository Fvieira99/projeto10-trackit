import { useContext } from "react";
import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";

import UserContext from "../../contexts/UserContext";
import HabitsContext from "../../contexts/HabitsContext";
import axios from "axios";

function Habit(props) {
	const { name, days, id } = props;
	const weekdays = ["D", "S", "T", "Q", "S", "S"];
	const { habits, setHabits } = useContext(HabitsContext);
	const { userInfo } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	function deleteHabit() {
		const URL = `
        https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}
        `;
		const promise = axios.delete(URL, config);
		promise.then((response) => {
			console.log(response);
			const filteredHabits = habits.filter((habit) => habit.id !== id);
			setHabits(filteredHabits);
		});
		promise.catch((err) => {
			console.log(err.response);
		});
	}

	function showHabit() {
		return (
			<Wrapper>
				<Container>
					<Name>
						<p>{name}</p>
						<span
							onClick={() => {
								Swal.fire({
									title: "Deseja deletar este hábito?",
									text: "Não será possível reverter esta ação!",
									icon: "warning",
									showCancelButton: true,
									confirmButtonColor: "#3085d6",
									cancelButtonColor: "#d33",
									confirmButtonText: "Sim",
									cancelButtonText: "Não",
								}).then((result) => {
									if (result.isConfirmed) {
										deleteHabit();
										setHabits();
									}
								});
							}}
						>
							<BsFillTrashFill />
						</span>
					</Name>
					<div>
						{weekdays.map((weekday, index) => {
							return (
								<Weekday key={index} i={index} days={days}>
									{weekday}
								</Weekday>
							);
						})}
					</div>
				</Container>
			</Wrapper>
		);
	}

	return <>{showHabit()}</>;
}

const Wrapper = styled.div`
	width: 90%;
	height: 91px;
	background-color: #fff;
	margin-bottom: 10px;
	border-radius: 5px;
`;

const Container = styled.div`
	width: 90%;
	margin: 0 auto;

	div {
		display: flex;
		gap: 5px;
	}
`;

const Weekday = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 5px;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	color: ${(props) =>
		props.days.some((day) => day === props.i) ? "#FFFFFF" : "#CFCFCF"};
	background-color: ${(props) =>
		props.days.some((day) => day === props.i) ? "#CFCFCF" : "#FFFFFF"};

	width: 30px;
	height: 30px;
	border: 1px solid #d4d4d4;
	border-radius: 5px;
`;

const Name = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 13px auto 0 auto;
	width: 100%;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	color: #666666;
	line-height: 25px;

	span {
		width: 35px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
`;
export default Habit;

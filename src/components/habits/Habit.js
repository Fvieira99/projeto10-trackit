import { useContext } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";

import { Wrapper, Container, Weekday, Name } from "./styled/HabitStyled";
import UserContext from "../../contexts/UserContext";
import HabitsContext from "../../contexts/HabitsContext";
import TodayHabitsContext from "../../contexts/TodayHabitsContext";

function Habit(props) {
	const { count, setPercentage, todayHabitsCount, setTodayHabitsCount } =
		useContext(TodayHabitsContext);
	const { name, days, id } = props;
	const weekdays = ["D", "S", "T", "Q", "S", "S"];
	const { habits, setHabits } = useContext(HabitsContext);
	const { userInfo } = useContext(UserContext);
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};
	const date = dayjs().day();

	function deleteHabit() {
		const URL = `
        https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}
        `;
		const promise = axios.delete(URL, config);
		promise.then((response) => {
			if (days.some((day) => day === date)) {
				setTodayHabitsCount(todayHabitsCount - 1);
				const filteredHabits = habits.filter((habit) => habit.id !== id);
				setHabits(filteredHabits);
			} else {
				const filteredHabits = habits.filter((habit) => habit.id !== id);
				setHabits(filteredHabits);
			}
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

export default Habit;

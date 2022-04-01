import axios from "axios";
import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

import {
	Wrapper,
	ContainerForm,
	Weekday,
	ContainerActions,
	Input,
	Save,
	Cancel,
} from "./styled/CreateHabitStyled";
import HabitsContext from "../../contexts/HabitsContext";
import UserContext from "../../contexts/UserContext";

function CreateHabit(props) {
	const { isCreatingHabit, setIsCreatingHabit } = props;
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

	function sendNewHabit() {
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

		if (newHabitInfo.days.length > 0 && newHabitInfo.name.length > 0) {
			const promise = axios.post(URL, newHabitInfo, config);

			promise.then((response) => {
				setHabits([...habits, response.data]);
				setIsCreatingHabit(0);
				setIsLoading(false);
				setNewHabitInfo({ name: "", days: [] });
			});
			promise.catch((err) => {
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
		<Wrapper isCreatingHabit={isCreatingHabit}>
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
			<ContainerActions>
				<Cancel
					isLoading={isLoading}
					onClick={() => {
						setIsCreatingHabit(0);
					}}
				>
					Cancelar
				</Cancel>
				<Save
					isLoading={isLoading}
					onClick={() => {
						if (newHabitInfo.days.length > 0 && newHabitInfo.name.length > 0) {
							setIsLoading(true);
							sendNewHabit();
						} else {
							Swal.fire({
								icon: "error",
								title: "Opss...",
								text: "Alguma coisa deu errado! \b Preencha novamente seu hábito",
							});
						}
					}}
				>
					{isLoading ? (
						<ThreeDots color="#fff" height="40" width="40" />
					) : (
						"Salvar"
					)}
				</Save>
			</ContainerActions>
		</Wrapper>
	);
}

export default CreateHabit;

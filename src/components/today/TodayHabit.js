import styled from "styled-components";
import { AiOutlineCheckSquare } from "react-icons/ai";

function TodayHabit(props) {
	const { name, done, highest, current } = props;
	return (
		<Wrapper>
			<Habit>
				<span>{name}</span>
				<div>
					<span>Sequência Atual: {current} dias</span>
					<span>Seu recorder: {highest} dias</span>
				</div>
			</Habit>
			<CheckBox>
				<AiOutlineCheckSquare color="#FFFFFF" size="35px" />
			</CheckBox>
		</Wrapper>
	);
}

export default TodayHabit;

const Habit = styled.div;

const Wrapper = styled.div;

const CheckBox = styled.div;

import styled from "styled-components";
import { useContext } from "react";

import TodayHabitsContext from "../../contexts/TodayHabitsContext";
import Footer from "../Footer";
import Header from "../Header";

function Historic() {
	const { percentage } = useContext(TodayHabitsContext);

	return (
		<Wrapper>
			<Header />
			<h2>Histórico</h2>
			<h3>Em breve você poderá ver o histórico dos seus hábitos aqui!</h3>
			<Footer percentage={percentage} />
		</Wrapper>
	);
}

export default Historic;

const Wrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #e5e5e5;

	h2,
	h3 {
		width: 90%;
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
	}

	h2 {
		margin-top: 98px;
		margin-bottom: 17px;
		font-size: 22.976px;
		line-height: 29px;
		color: #126ba5;
	}
	h3 {
		font-size: 17.976px;
		line-height: 22px;
		color: #666666;
	}
`;

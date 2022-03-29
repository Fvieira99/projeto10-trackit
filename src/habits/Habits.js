import { Link } from "react-router-dom";
import styled from "styled-components";

import Header from "../Header";

function Habits() {
	return (
		<Container>
			<Header />
			<Title>
				<span>Meus Hábitos</span>
				<button>+</button>
			</Title>
			<Text>
				Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
				começar a trackear!
			</Text>
		</Container>
	);
}

export default Habits;

const Container = styled.div`
	min-height: calc(100vh);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #e5e5e5;
`;

const Title = styled.div`
	margin-top: 21px;
	width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	span {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 23px;
		color: #126ba5;
	}

	button {
		width: 40px;
		height: 35px;
		background-color: #52b6ff;
		border: none;
		border-radius: 4.63636px;
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 27px;
		color: #ffffff;
	}
`;

const Text = styled.span`
	width: 90%;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	color: #666666;
`;

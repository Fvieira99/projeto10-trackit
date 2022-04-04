import styled from "styled-components";

export { Container, Date, Habits, Text };

const Container = styled.div`
	background-color: #e5e5e5;
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Date = styled.h1`
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 23px;
	color: #126ba5;
	width: 90%;
	margin-top: 100px;
`;

const Habits = styled.div`
	margin-top: 30px;
	margin-bottom: 120px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
`;

const Text = styled.span`
	width: 90%;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 17.976px;
	line-height: 22px;
	color: ${(props) => (props.count > 0 ? "#8FC549;" : "#bababa;")};
	margin-top: 5px;
`;

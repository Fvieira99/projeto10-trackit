import styled from "styled-components";

export { Wrapper, Container, Title, Text };

const Wrapper = styled.div`
	min-height: calc(100vh);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #e5e5e5;
`;

const Container = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 120px;
`;

const Title = styled.div`
	margin-top: 91px;
	margin-bottom: 20px;
	width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	span {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 23px;
		line-height: 29px;
		color: #126ba5;
	}

	div {
		width: 51px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 4.63636px;
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 27px;
	}
`;

const Text = styled.span`
	width: 90%;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	color: #666666;
	line-height: 22px;
`;

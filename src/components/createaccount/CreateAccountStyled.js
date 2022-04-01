import styled from "styled-components";

export { Container, LoginLink, SignUpForm };

const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-family: "Playball";
		font-style: normal;
		font-weight: 400;
		font-size: 69px;
		color: #126ba5;
		margin-bottom: 20px;
	}
	img {
		margin-top: 70px;
		width: 50%;
	}
`;

const LoginLink = styled.span`
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 13.976px;
	text-decoration-line: underline;
	color: #52b6ff;
	cursor: pointer;
`;

const SignUpForm = styled.form`
	 {
		display: flex;
		flex-direction: column;
		width: 85%;
		gap: 6px;
		margin-bottom: 25px;
	}
`;

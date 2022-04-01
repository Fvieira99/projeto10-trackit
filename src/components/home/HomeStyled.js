import styled from "styled-components";

export { Container, SignUpLink, LoginForm, Button, Input };

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

const SignUpLink = styled.span`
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 13.976px;
	text-decoration-line: underline;
	color: #52b6ff;
	cursor: pointer;
`;

const LoginForm = styled.form`
	 {
		display: flex;
		flex-direction: column;
		width: 85%;
		gap: 6px;
		margin-bottom: 25px;
	}
`;

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: ${(props) => (props.isLoading ? "none" : "auto")};
	opacity: ${(props) => (props.isLoading ? "0.7" : "1")};
	width: 100%;
	height: 45px;
	border-radius: 5px;
	border: none;
	color: #ffffff;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	background-color: #52b6ff;
`;

const Input = styled.input`
	background-color: ${(props) => (props.isLoading ? "#F2F2F2;" : "#FFFFFF;")}
	width: 100%;
	height: 45px;
	border: 1px solid #d5d5d5;
	border-radius: 5px;
	text-indent: 10px;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	::placeholder {
	color: #dbdbdb;
	}

`;

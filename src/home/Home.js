import { Link } from "react-router-dom";
import styled from "styled-components";

function createLoginForm() {
	return (
		<>
			<Input
				id="email"
				type="email"
				name="q"
				required
				placeholder="email"
			></Input>

			<Input id="answer" type="answer" name="a" placeholder="senha"></Input>
			<Link to="/habitos">
				<Button>Entrar</Button>
			</Link>
		</>
	);
}

function Home() {
	return (
		<Container>
			<h1>TrackIt</h1>
			<LoginForm>form</LoginForm>
			<Link to="/cadastro">
				<SignUpLink>Não tem uma conta? Cadastre-se!</SignUpLink>
			</Link>
		</Container>
	);
}

export default Home;

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
	}
`;

const Button = styled.button`
	pointer-events: ${(props) => (props.load ? "none" : "auto")};
	opacity: ${(props) => (props.load ? "0.7" : "1")};
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
	background-color: ${(props) => (props.load ? "#F2F2F2;" : "#FFFFFF;")}
	pointer-events: ${(props) => (props.load ? "none" : "auto")}
	width: 100%;
	height: 45px;
	border: 1px solid #d5d5d5;
	border-radius: 5px;
	text-indent: 5px;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	color: #dbdbdb;
	::placeholder {
	color: #dbdbdb;
	}

`;

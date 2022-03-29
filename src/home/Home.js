import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo-trackit.png";

function Home() {
	const [inputValue, setInputValue] = useState({ email: "", password: "" });
	const [load, setLoad] = useState(false);

	const navigate = useNavigate();

	function sendLoginInfo(e) {
		e.preventDefault();
		setLoad(true);
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

		const promise = axios.post(URL, inputValue);

		promise.then((response) => {
			console.log(response);
			alert("UHULL");
			navigate("/hoje", { state: response.data });
		});

		promise.catch((error) => {
			console.log(error);
			alert(
				"Usuário e/ou email inválido(s) \n Caso ainda não tenha uma conta clique no link abaixo do botão 'Login' "
			);
			setLoad(false);
			setInputValue({ email: "", password: "" });
		});
	}

	function showLoginForm() {
		return (
			<>
				<Input
					disabled={load}
					onChange={(e) => {
						setInputValue({ ...inputValue, email: e.target.value });
					}}
					load={load}
					value={inputValue.email}
					id="email"
					type="email"
					name="q"
					required
					placeholder="email"
				></Input>

				<Input
					disabled={load}
					onChange={(e) => {
						setInputValue({ ...inputValue, password: e.target.value });
					}}
					load={load}
					id="answer"
					type="answer"
					name="a"
					placeholder="senha"
					required
					value={inputValue.password}
				></Input>

				<Button load={load} type="submit">
					Entrar
				</Button>
			</>
		);
	}

	return (
		<Container>
			<img src={logo} />
			<h1>TrackIt</h1>
			<LoginForm onSubmit={sendLoginInfo}>{showLoginForm()}</LoginForm>
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

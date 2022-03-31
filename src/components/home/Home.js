import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "../../contexts/UserContext";
import logo from "../../assets/logo-trackit.png";

function Home() {
	const [inputValue, setInputValue] = useState({ email: "", password: "" });
	const [isLoading, setIsLoading] = useState(false);
	const { setUserInfo } = useContext(UserContext);
	const navigate = useNavigate();

	function sendLoginInfo(e) {
		e.preventDefault();
		setIsLoading(true);
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

		const promise = axios.post(URL, inputValue);

		promise.then((response) => {
			console.log(response);
			navigate("/hoje");
			setUserInfo(response.data);
		});

		promise.catch((error) => {
			console.log(error);
			alert(
				"Usuário e/ou email inválido(s) \n Caso ainda não tenha uma conta clique no link abaixo do botão 'Login' "
			);
			setIsLoading(false);
			setInputValue({ email: "", password: "" });
		});
	}

	function showLoginForm() {
		return (
			<>
				<Input
					disabled={isLoading}
					onChange={(e) => {
						setInputValue({ ...inputValue, email: e.target.value });
					}}
					isLoading={isLoading}
					value={inputValue.email}
					id="email"
					type="email"
					name="q"
					required
					placeholder="email"
				></Input>

				<Input
					disabled={isLoading}
					onChange={(e) => {
						setInputValue({ ...inputValue, password: e.target.value });
					}}
					isLoading={isLoading}
					id="answer"
					type="password"
					name="a"
					placeholder="senha"
					required
					value={inputValue.password}
				></Input>

				<Button isLoading={isLoading} type="submit">
					{isLoading ? (
						<ThreeDots color="#fff" height="40" width="40" />
					) : (
						"Entrar"
					)}
				</Button>
			</>
		);
	}

	return (
		<Container>
			<img src={logo} alt="trackit logo" />
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

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import { Container, SignUpLink, LoginForm, Button, Input } from "./HomeStyled";
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
			navigate("/hoje");
			setUserInfo(response.data);
		});

		promise.catch((error) => {
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

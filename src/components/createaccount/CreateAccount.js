import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

import { Button, Input } from "../home/HomeStyled";
import { Container, LoginLink, SignUpForm } from "./CreateAccountStyled";
import logo from "../../assets/logo-trackit.png";

function CreateAccount() {
	const [inputValue, setInputValue] = useState({
		email: "",
		name: "",
		image: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	function sendAccountInfo(e) {
		e.preventDefault();
		setIsLoading(true);
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
		const promise = axios.post(URL, { ...inputValue });
		promise.then((response) => {
			Swal.fire({
				icon: "success",
				title: "Seja Bem Vindo",
				confirmButtonColor: "#52B6FF",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/");
				}
			});
		});
		promise.catch((error) => {
			if (error.status === 409) {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Usuário e/ou email já registrado(s)",
				}).then((result) => {
					if (result.isConfirmed) {
						setIsLoading(false);
						setInputValue({ email: "", name: "", image: "", password: "" });
					}
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Por favor preencha corretamente o formulário",
					confirmButtonColor: "#52B6FF",
				}).then((result) => {
					if (result.isConfirmed) {
						setIsLoading(false);
						setInputValue({ email: "", name: "", image: "", password: "" });
					}
				});
			}
		});
	}

	function showSignUpForm() {
		return (
			<>
				<Input
					disabled={isLoading}
					onChange={(e) => {
						setInputValue({ ...inputValue, email: e.target.value });
					}}
					value={inputValue.email}
					id="email"
					type="email"
					name="q"
					required
					placeholder="email"
					isLoading={isLoading}
				></Input>

				<Input
					disabled={isLoading}
					onChange={(e) => {
						setInputValue({ ...inputValue, password: e.target.value });
					}}
					value={inputValue.password}
					id="password"
					type="password"
					name="a"
					minLength="8"
					required
					placeholder="senha"
					isLoading={isLoading}
				></Input>

				<Input
					disabled={isLoading}
					onChange={(e) => {
						setInputValue({ ...inputValue, name: e.target.value });
					}}
					value={inputValue.name}
					id="name"
					type="text"
					minLength="1"
					name="n"
					required
					placeholder="nome"
					isLoading={isLoading}
				></Input>

				<Input
					disabled={isLoading}
					onChange={(e) => {
						setInputValue({ ...inputValue, image: e.target.value });
					}}
					value={inputValue.image}
					id="image"
					type="text"
					minLength="1"
					name="p"
					required
					placeholder="foto"
					isLoading={isLoading}
				></Input>

				<Button isLoading={isLoading} type="submit">
					{isLoading ? (
						<ThreeDots color="#fff" height="40" width="40" />
					) : (
						"Cadastrar"
					)}
				</Button>
			</>
		);
	}

	return (
		<Container>
			<img src={logo} alt="trackit logo" />
			<h1>TrackIt</h1>
			<SignUpForm onSubmit={sendAccountInfo}>{showSignUpForm()}</SignUpForm>
			<Link to="/">
				<LoginLink>Ja tem uma conta? Faça Login!</LoginLink>
			</Link>
		</Container>
	);
}

export default CreateAccount;

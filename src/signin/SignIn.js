import { Link } from "react-router-dom";
import styled from "styled-components";

function SignIn() {
	return (
		<Container>
			<h1>TrackIt</h1>
			<form>
				<input
					id="email"
					type="email"
					name="q"
					required
					placeholder="email"
				></input>

				<input id="answer" type="answer" name="a" placeholder="senha"></input>

				<input
					id="name"
					type="text"
					minLength="1"
					name="n"
					required
					placeholder="nome"
				></input>

				<input
					id="photo"
					type="url"
					name="p"
					required
					placeholder="foto"
				></input>

				<button>Entrar</button>
			</form>
			<Link to="/">
				<LoginLink>Ja tem uma conta? Faça Login!</LoginLink>
			</Link>
		</Container>
	);
}

export default SignIn;

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

	form {
		display: flex;
		flex-direction: column;
		width: 85%;
		gap: 6px;

		input {
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
		}
		input::placeholder {
			color: #dbdbdb;
		}

		button {
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
		}
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

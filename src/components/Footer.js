import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import styled from "styled-components";
import { Link } from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";

function Footer() {
	return (
		<Container>
			<Link to="/habitos">
				<span>Habitos</span>
			</Link>
			<Link to="/hoje">
				<CircularProgressbar
					value={0}
					text="Hoje"
					background
					backgroundPadding={5}
					styles={buildStyles({
						textColor: "#fff",
						backgroundColor: "#52B6FF",
						textSize: "19px",
						pathColor: "#fff",
						trailColor: "transparent",
					})}
				/>
			</Link>
			<Link to="/historico">
				<span>Historico</span>
			</Link>
		</Container>
	);
}

export default Footer;

const Container = styled.div`
	width: 100%;
	max-height: 70px;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: fixed;
	bottom: 0;
	z-index: 2;

	a {
		text-decoration: none;
		color: #52b6ff;
	}

	a:visited {
		color: #52b6ff;
	}

	a svg {
		font-family: Lexend Deca;
		margin-bottom: 50px;
		width: 91px;
		height: 91px;
	}

	a span {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
	}
`;

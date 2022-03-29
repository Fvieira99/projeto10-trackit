import styled from "styled-components";

function Header() {
	return (
		<Container>
			<Content>
				<span>TrackIt</span>
				<img></img>
			</Content>
		</Container>
	);
}

export default Header;

const Container = styled.header`
	width: 100%;
	height: 70px;
	background-color: #126ba5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Content = styled.div`
	width: 90%;
	display: flex;
	justify-content: space-between;
	span {
		font-family: "Playball";
		font-style: normal;
		font-weight: 400;
		font-size: 39px;
		color: #ffffff;
	}
`;

import styled from "styled-components";

export { Wrapper, Container, Weekday, Name };

const Wrapper = styled.div`
	width: 90%;
	height: 91px;
	background-color: #fff;
	margin-bottom: 10px;
	border-radius: 5px;
`;

const Container = styled.div`
	width: 90%;
	margin: 0 auto;

	div {
		display: flex;
		gap: 5px;
	}
`;

const Weekday = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 5px;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	color: ${(props) =>
		props.days.some((day) => day === props.i) ? "#FFFFFF" : "#CFCFCF"};
	background-color: ${(props) =>
		props.days.some((day) => day === props.i) ? "#CFCFCF" : "#FFFFFF"};

	width: 30px;
	height: 30px;
	border: 1px solid #d4d4d4;
	border-radius: 5px;
`;

const Name = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 13px auto 0 auto;
	width: 100%;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	color: #666666;
	line-height: 25px;

	span {
		width: 35px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
`;

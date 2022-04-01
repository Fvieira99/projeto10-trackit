import styled from "styled-components";

export {
	Wrapper,
	ContainerForm,
	Weekday,
	ContainerActions,
	Input,
	Save,
	Cancel,
};

const Wrapper = styled.div`
	width: 90%;
	height: 180px;
	background-color: #fff;
	border-radius: 5px;
	display: ${(props) => (props.isCreatingHabit ? "flex" : "none")};
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const ContainerForm = styled.form`
	width: 90%;
	margin: 15px auto 0 auto;

	div {
		margin-top: 4px;
		display: flex;
		gap: 4px;
	}
`;

const Weekday = styled.div`
	pointer-events: ${(props) => (props.isLoading ? "none" : "all")};
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #d4d4d4;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 19.976px;
	color: ${(props) =>
		props.days.some((number) => number === props.i) ? "#FFFFFF" : "#CFCFCF"};

	border-radius: 5px;
	background-color: ${(props) =>
		props.days.some((number) => number === props.i) ? "#CFCFCF" : "#FFFFFF"};
`;

const ContainerActions = styled.div`
	width: 90%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin: 0 auto 15px auto;
	gap: 23px;
`;

const Input = styled.input`
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	text-indent: 5px;
	width: 100%;
	height: 45px;
	border: 1px solid #d4d4d4;
	border-radius: 5px;
	background-color: ${(props) => (props.isLoading ? "#f2f2f2" : "#ffffff;")};

	::placeholder {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		color: #dbdbdb;
	}
`;

const Save = styled.button`
	width: 84px;
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #52b6ff;
	opacity: ${(props) => (props.isLoading ? "0.7" : "1")};
	border: none;
	border-radius: 4.5px;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	color: #ffffff;
`;

const Cancel = styled.span`
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	color: #52b6ff;
	pointer-events: ${(props) => (props.isLoading ? "none" : "all")};
	opacity: ${(props) => (props.isLoading ? "0.7" : "1")};
`;

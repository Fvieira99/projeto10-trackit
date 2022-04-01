import styled from "styled-components";

export { Wrapper, Container, Habit, CurrentCount, HighestCount };

const Wrapper = styled.div`
	width: 90%;
	height: 94px;
	border-radius: 5px;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Habit = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	gap: 7px;

	span {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 19.976px;
		line-height: 25px;
		color: #666666;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
`;

const CurrentCount = styled.span`
	display: flex;
	align-items: center;
	gap: 5px;

	span,
	h2 {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 12.976px;
		line-height: 16px;
	}
	h2 {
		color: #666666;
	}

	span {
		color: ${(props) => (props.isDone ? "#8FC549" : "#666666")};
	}
`;

const HighestCount = styled.span`
	display: flex;
	align-items: center;
	gap: 5px;

	span,
	h2 {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 12.976px;
		line-height: 16px;
	}
	h2 {
		color: #666666;
	}
	span {
		color: ${(props) =>
			props.highest === props.current && props.highest !== 0 && props.isDone
				? "#8FC549;"
				: "#666666;"};
	}
`;

import styled from 'styled-components';

export const Card = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 0 20px;
  height: 100%;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
`;

export const CardContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Block = styled.View`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 10px;
`;

export const Image = styled.Image`
  width: 130px;
  height: 130px;
  margin: 0 auto;
`;

export const Row = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 13px;
  color: #999;
`;

export const Description = styled.Text`
  font-size: 28px;
  color: ${(props) => (props.color ? props.color : '#333')};
  margin-top: 3px;
`;

export const CardFooter = styled.View`
  padding: 30px;
  background: #eee;
  border-radius: 4px;
`;

export const Annotation = styled.Text`
  font-size: 12px;
  color: #333;
`;

export const Error = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorTitle = styled.Text`
  font-family: sans-serif;
  font-weight: bold;
  font-size: 35px;
  margin-bottom: 25px;
`;

export const ErrorText = styled.Text`
  text-align: justify;
`;

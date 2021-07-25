import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Message = styled.Text`
  color: ${(props) => (props.color === 'Conectado!' ? '#639a67' : '#ff6363')};
  margin-left: 10px;
  font-size: 14px;
`;

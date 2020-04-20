import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  flex-direction: column;
`;

export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 20px;
`;

export const Title = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  font-size: 20px;
  color: #333;
`;

export const Paragraph = styled.View`
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Link = styled(TouchableOpacity)`
  color: blue;
  font-size: 14px;
  align-items: center;
  flex-direction: row;
  margin: 5px;
`;

export const LinkText = styled.Text`
  margin-left: 10px;
  color: ${(props) => (props.color ? props.color : '#c04848')};
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #a825c2;
  padding: 10px 0;
`;

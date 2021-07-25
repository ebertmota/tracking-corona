import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

export const Container = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
})`
  max-width: 200px;
  flex: 1;
  height: 40px;
  background: #fff;
  border-radius: 4px;
  padding: 0 15px;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #821782;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
`;

export const Content = styled.View`
  flex: 1;
  max-height: 400px;
  max-width: 380px;
  min-width: 380px;
  z-index: 5;
`;

export const Image = styled.Image`
  width: 200px;
  height: 130px;
  margin-bottom: 30px;
`;

export const Share = styled(TouchableOpacity)`
  align-items: center;
  flex-direction: row;
`;

export const Annotation = styled.Text`
  color: #666;
  margin-left: 10px;
`;

export const SelectContainer = styled.View`
  margin: 0;
  padding: 20px;
  width: 100%;
`;

export const SelectItem = styled.View`
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  font-size: 16px;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`;

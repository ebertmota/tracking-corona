import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  max-height: 400px;
  max-width: 380px;
  min-width: 380px;
  z-index: 5;
`;

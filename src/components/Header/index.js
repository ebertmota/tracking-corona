import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Title } from './styles';

export default function Header() {
  return (
    <Container>
      <Title>Tracking Corona</Title>
      <Icon name="keyboard-arrow-down" size={20} color="#FFF" />
    </Container>
  );
}

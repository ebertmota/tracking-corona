import React from 'react';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Title,
  Paragraph,
  Link,
  LinkText,
  Text,
  TitleContainer,
  DevCard,
  DevLinks,
  Separator,
  DevTitle,
} from './styles';

function About() {
  return (
    <Container>
      <Paragraph>
        <TitleContainer>
          <Icon name="data-usage" size={18} color="#c04848" />
          <Title>Origem dos Dados</Title>
        </TitleContainer>
        <Text>
          Todos os dados dessa aplicação são consumidos pelas seguintes fontes:
        </Text>

        <Link onPress={() => Linking.openURL('https://saude.gov.br/')}>
          <Icon name="radio-button-checked" size={12} color="#C04848" />
          <LinkText>Ministério da Saúde</LinkText>
        </Link>
        <Link onPress={() => Linking.openURL('https://covid.saude.gov.br/')}>
          <Icon name="radio-button-checked" size={12} color="#C04848" />
          <LinkText>Coronavírus Brasil</LinkText>
        </Link>
        <Link
          onPress={() =>
            Linking.openURL('https://github.com/CSSEGISandData/COVID-19')
          }
        >
          <Icon name="radio-button-checked" size={12} color="#C04848" />
          <LinkText>CSSEGISandData</LinkText>
        </Link>
        <Link
          onPress={() =>
            Linking.openURL(
              'https://github.com/devarthurribeiro/covid19-brazil-api'
            )
          }
        >
          <Icon name="radio-button-checked" size={12} color="#C04848" />
          <LinkText>COVID-19 Brazil API</LinkText>
        </Link>
      </Paragraph>

      <Paragraph>
        <TitleContainer>
          <Icon name="code" size={20} color="#a825c2" />
          <Title>{` Desenvolvimento`}</Title>
        </TitleContainer>

        <DevCard>
          <DevTitle>Ebert Mota</DevTitle>
          <DevLinks>
            <Link
              onPress={() => Linking.openURL('https://github.com/ebertmota')}
            >
              <FaIcon name="github" size={20} />
            </Link>
            <Separator />
            <Link
              onPress={() =>
                Linking.openURL('https://www.linkedin.com/in/ebertmota/')
              }
            >
              <FaIcon name="linkedin" size={20} />
            </Link>
          </DevLinks>
        </DevCard>
      </Paragraph>
    </Container>
  );
}

export default About;

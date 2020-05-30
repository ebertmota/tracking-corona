import React, { Component } from 'react';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { ActivityIndicator, Linking, Keyboard } from 'react-native';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  Content,
  Image,
  Share,
  Annotation,
} from './styles';

import {
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Block,
  Row,
  Error,
  ErrorTitle,
  ErrorText,
} from '../../components/Card/styles';

import flag from '../../utils/flagImages';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suspects: 0,
      confirmed: 0,
      deaths: 0,
      uf: '',
      state: '',
      updated_at: '',
      image_url: '',
      loading: true,
    };
  }

  handleSearch = async () => {
    const { uf } = this.state;
    const response = await api.get(`/api/report/v1/brazil/uf/${uf}`);

    const { data } = response;

    this.setState({
      suspects: this.formatNumber(data.suspects),
      confirmed: this.formatNumber(data.cases),
      deaths: this.formatNumber(data.deaths),
      loading: false,
      updated_at: data.datetime,
      state: data.state,
    });

    this.handleDate();
    Keyboard.dismiss();
    hideNavigationBar();
  };

  handleDate = () => {
    const { updated_at } = this.state;

    const formattedDate = format(
      parseISO(updated_at),
      "dd 'de' MMMM' de 'YYY'",
      {
        locale: pt,
      }
    );

    this.setState({
      updated_at: formattedDate,
    });
  };

  sendWhatsapp = () => {
    const { suspects, confirmed, deaths, updated_at, state } = this.state;

    const message = `
    [ *${state}* ] Casos de coronavírus Atualizados em ${updated_at}. %0A
    *${confirmed}* Confirmados  %0A
    *${suspects}* Suspeitos %0A
    *${deaths}* Mortes %0A
    🚨 *Evite fake news* 🚨 %0A
    Sobre a doença: coronavirus.saude.gov.br/index.php/sobre-a-doenca`;

    Linking.openURL(`whatsapp://send?text=${message}`);
  };

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  clearNumberValue = () => {
    this.setState({
      suspects: '',
      confirmed: '',
      deaths: '',
    });
  };

  render() {
    const { uf, suspects, confirmed, deaths, loading } = this.state;

    return (
      <Container colors={['#C04848', '#480048']}>
        <Form>
          <Input
            value={uf}
            autoCorrect={false}
            maxLength={2}
            autoCapitalize="characters"
            placeholder="UF desejada..."
            onChangeText={(text) => {
              this.setState({
                uf: text.toUpperCase(),
              });
              this.clearNumberValue();
            }}
            returnKeyType="send"
            onSubmitEditing={this.handleSearch}
          />
          <SubmitButton onPress={this.handleSearch}>
            <SearchIcon name="search" size={24} color="#FFF" />
          </SubmitButton>
        </Form>
        <Content>
          {suspects === 0 && confirmed === 0 && deaths === 0 && loading ? (
            <></>
          ) : (
            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                {loading ? (
                  <ActivityIndicator size={30} color="#480048" />
                ) : (
                  <>
                    {suspects === undefined &&
                    confirmed === undefined &&
                    deaths === undefined ? (
                      <Error>
                        <ErrorTitle>OOPS!</ErrorTitle>
                        <ErrorText>
                          Algo deu errado, por favor verifique a UF digitada e
                          tente novamente.
                        </ErrorText>
                      </Error>
                    ) : (
                      <>
                        <Image
                          // source={require(`../../assets/flags/${uf}.jpg`)}
                          source={flag[uf]}
                        />

                        <Row>
                          <Block>
                            <Title>Suspeitos</Title>
                            <Description numberOfLines={1} adjustsFontSizeToFit>
                              {suspects}
                            </Description>
                          </Block>
                          <Block>
                            <Title>Confirmados</Title>
                            <Description
                              color="#639a67"
                              numberOfLines={1}
                              adjustsFontSizeToFit
                            >
                              {confirmed}
                            </Description>
                          </Block>
                          <Block>
                            <Title>Mortes</Title>
                            <Description
                              color="#ff6363"
                              numberOfLines={1}
                              adjustsFontSizeToFit
                            >
                              {deaths}
                            </Description>
                          </Block>
                        </Row>
                      </>
                    )}
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Share onPress={this.sendWhatsapp}>
                  {suspects !== undefined &&
                  confirmed !== undefined &&
                  deaths !== undefined ? (
                    <>
                      <Icon name="whatsapp" size={22} color="#666" />
                      <Annotation>Compartilhar</Annotation>
                    </>
                  ) : (
                    <></>
                  )}
                </Share>
              </CardFooter>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}

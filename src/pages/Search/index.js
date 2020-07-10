import React, { Component } from 'react';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import { parseISO, format } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';
import pt from 'date-fns/locale/pt';
import { ActivityIndicator, Linking, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import {
  Container,
  Content,
  Image,
  Share,
  Annotation,
  SelectItem,
  SelectContainer,
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
      deaths: 0,
      confirmed: 0,
      lethality: 0,
      uf: '',
      ufs: [],
      updated_at: '',
      image_url: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const response = await api.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    );

    const ufInformation = response.data.map((uf) => {
      return {
        label: uf.nome,
        value: uf.sigla,
      };
    });

    this.setState({ ufs: ufInformation });
  }

  async handleUfChange(value) {
    await this.setState({ uf: value });

    if (this.state.uf !== '') {
      this.handleSearch();
    }
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  handleSearch = async () => {
    const { uf } = this.state;
    const response = await api.get(`/api/report/v1/brazil/uf/${uf}`);

    const { data } = response;

    this.setState({
      deaths: this.formatNumber(data.deaths),
      confirmed: this.formatNumber(data.cases),
      updated_at: data.datetime,
    });

    this.setLethality();

    this.setState({ loading: false });

    this.handleDate();
    Keyboard.dismiss();
    hideNavigationBar();
  };

  setLethality = async () => {
    const { deaths, confirmed } = this.state;

    const lethalityValue = (deaths / confirmed) * 100;
    const lethalityInt = parseInt(lethalityValue, 10);
    const lethalityFormatted = lethalityInt.toPrecision(2);
    const total = lethalityFormatted.replace('e+3', '');

    this.setState({ lethality: total });
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
    const { lethality, confirmed, deaths, updated_at, state } = this.state;

    const message = `
    [ *${state}* ] Casos de coronavírus Atualizados em ${updated_at}. %0A
    *${confirmed}* Confirmados  %0A
    *${lethality}* de Letalidade %0A
    *${deaths}* Mortes %0A
    🚨 *Evite fake news* 🚨 %0A
    Sobre a doença: coronavirus.saude.gov.br/index.php/sobre-a-doenca`;

    Linking.openURL(`whatsapp://send?text=${message}`);
  };

  clearNumberValue = () => {
    this.setState({
      lethality: '',
      confirmed: '',
      deaths: '',
    });
  };

  render() {
    const { uf, lethality, confirmed, deaths, loading, ufs } = this.state;

    return (
      <Container colors={['#C04848', '#480048']}>
        <SelectContainer>
          <SelectItem>
            <RNPickerSelect
              onValueChange={(value) => this.handleUfChange(value)}
              placeholder={{ label: 'Selecione o estado', value: 0 }}
              items={ufs}
              style={{
                inputAndroidContainer: {
                  justifyContent: 'center',
                },
                placeholder: { color: '#333' },
                inputAndroid: { fontSize: 16, lineHeight: 60 },
              }}
            />
          </SelectItem>
        </SelectContainer>

        <Content>
          {lethality === 0 && confirmed === 0 && deaths === 0 && loading ? (
            <></>
          ) : (
            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                {loading ? (
                  <ActivityIndicator size={30} color="#480048" />
                ) : (
                  <>
                    {lethality === undefined &&
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
                            <Title>Letalidade</Title>
                            <Description numberOfLines={1} adjustsFontSizeToFit>
                              {lethality}%
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
                  {lethality !== undefined &&
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

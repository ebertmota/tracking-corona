import React, { Component } from 'react';
import { ActivityIndicator, Linking } from 'react-native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Tabs from '../../components/Tabs';
import api from '../../services/api';

import NetworkInformation from '../../components/NetworkInformation';

import brazilLogo from '../../assets/brasil.png';

import { Container, Content } from './styles';

import {
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Annotation,
  Block,
  Image,
  Row,
} from '../../components/Card/styles';

export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      lethality: 0,
      confirmed: 0,
      deaths: 0,
      updated_at: '',
      loading: true,
      messageConnection: 'Connected',
    };
  }

  async componentDidMount() {
    await this.loadData();
    this.handleDate();
  }

  loadData = async () => {
    const response = await api.get('/api/report/v1/brazil');

    const { data } = await response.data;

    this.setState({
      confirmed: data.confirmed,
      deaths: data.deaths,
      updated_at: data.updated_at,
      loading: false,
    });

    await this.setLethality();
  };

  setLethality = () => {
    const { deaths, confirmed: cases } = this.state;

    const lethalityValue = (deaths / cases) * 100;
    const lethalityPercent = lethalityValue.toFixed(1);
    this.setState({ lethality: lethalityPercent });
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

  handleUpdate = async () => {
    this.setState({ loading: true });
    this.componentDidMount();
  };

  handleNavigate = (page) => {
    const { navigation } = this.props;

    navigation.navigate(page);
  };

  sendWhatsapp = () => {
    const { lethality, confirmed, deaths, updated_at } = this.state;

    const message = `
    🇧🇷 Casos de coronavírus no Brasil Atualizados ${updated_at}.%0A
    *${confirmed}* Confirmados  %0A
    *${deaths}* Mortes %0A
    Letalidade de *${lethality}${encodeURIComponent('%')}* %0A
    🚨 Evite fake news 🚨 %0A
    Sobre a doença: coronavirus.saude.gov.br/index.php/sobre-a-doenca`;

    Linking.openURL(`whatsapp://send?text=${message}`);
  };

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  render() {
    const { lethality, confirmed, deaths, updated_at, loading } = this.state;

    return (
      <Container colors={['#C04848', '#480048']}>
        <Header />
        <Content>
          <Card>
            <CardHeader>
              <NetworkInformation />
            </CardHeader>
            <CardContent>
              {loading ? (
                <ActivityIndicator size={30} color="#480048" />
              ) : (
                <>
                  <Image source={brazilLogo} />
                  <Row>
                    <Block>
                      <Title>Letalidade</Title>
                      <Description color="#f37575">{lethality}%</Description>
                    </Block>
                    <Block>
                      <Title>Confirmados</Title>
                      <Description
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        color="#639a67"
                      >
                        {this.formatNumber(confirmed)}
                      </Description>
                    </Block>
                    <Block>
                      <Title>Mortes</Title>
                      <Description
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        color="#f8b642"
                      >
                        {this.formatNumber(deaths)}
                      </Description>
                    </Block>
                  </Row>
                  {/* 265896 */}
                </>
              )}
            </CardContent>
            <CardFooter>
              {updated_at ? (
                <Annotation>Atualizado em {updated_at}</Annotation>
              ) : (
                <></>
              )}
            </CardFooter>
          </Card>
        </Content>
        <Tabs
          update={this.handleUpdate}
          navigate={this.handleNavigate}
          share={this.sendWhatsapp}
        />
      </Container>
    );
  }
}

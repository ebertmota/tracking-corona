import React, { useEffect, useState } from 'react';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import { parseISO, format } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';
import pt from 'date-fns/locale/pt';
import { ActivityIndicator, Linking, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { formatNumber } from '../../utils/numberFormatters';
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
  CardContent,
  BlockContainer,
  Title,
  Description,
  CardFooter,
  Block,
  Error,
  ErrorTitle,
  ErrorText,
} from '../../components/Card/styles';

import flag from '../../utils/flagImages';

const Search = () => {
  const [data, setData] = useState({
    deaths: '',
    confirmed: '',
    lethality: '',
  });
  const [lethality, setLethality] = useState('');
  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      );

      const ufInformation = response.data.map((uf) => {
        return {
          label: uf.nome,
          value: uf.sigla,
        };
      });

      setUfs(ufInformation);
    }
    loadData();
  }, []);

  const handleSearch = async () => {
    const response = await api.get(`/api/report/v1/brazil/uf/${selectedUf}`);

    const { deaths, cases, datetime } = response.data;

    setData({
      deaths,
      confirmed: cases,
    });

    const calc = (deaths / cases) * 100;
    const lethalityInt = parseInt(calc, 10);
    const lethalityFormatted = lethalityInt.toPrecision(2);
    const total = lethalityFormatted.replace('e+3', '');

    setLethality(total);

    const formattedDate = format(parseISO(datetime), "dd 'de' MMMM' de 'YYY'", {
      locale: pt,
    });

    setUpdatedAt(formattedDate);

    setLoading(false);

    Keyboard.dismiss();
    hideNavigationBar();
  };

  useEffect(() => {
    setLoading(true);
    if (selectedUf !== '') {
      handleSearch();
    }
  }, [selectedUf]);

  const sendWhatsapp = async () => {
    const { confirmed, deaths } = data;

    const message = `
    [ *${selectedUf}* ] Casos de coronavírus Atualizados em ${updatedAt}. %0A
    *${formatNumber(confirmed)}* Confirmados  %0A
    *${formatNumber(lethality)}* de Letalidade %0A
    *${formatNumber(deaths)}* Mortes %0A
    🚨 *Evite fake news* 🚨 %0A
    Sobre a doença: coronavirus.saude.gov.br/index.php/sobre-a-doenca`;

    const whatsappIsIntalled = await Linking.canOpenURL(
      `whatsapp://send?text=${message}`
    );
    if (whatsappIsIntalled) {
      Linking.openURL(`whatsapp://send?text=${message}`);
    } else {
      Alert.alert(
        'Não foi possivel compartilhar',
        'Você precisa ter o Whatsapp instalado para compartilhar os dados.'
      );
    }
  };

  const { confirmed, deaths } = data;

  return (
    <Container colors={['#C04848', '#480048']}>
      <SelectContainer>
        <SelectItem>
          <RNPickerSelect
            onValueChange={(value) => setSelectedUf(value)}
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
        {!selectedUf ? (
          <></>
        ) : (
          <Card>
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
                        source={flag[selectedUf]}
                      />

                      <BlockContainer>
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
                            {formatNumber(confirmed)}
                          </Description>
                        </Block>
                        <Block>
                          <Title>Mortes</Title>
                          <Description
                            color="#ff6363"
                            numberOfLines={1}
                            adjustsFontSizeToFit
                          >
                            {formatNumber(deaths)}
                          </Description>
                        </Block>
                      </BlockContainer>
                    </>
                  )}
                </>
              )}
            </CardContent>
            <CardFooter>
              <Share onPress={sendWhatsapp}>
                {selectedUf ? (
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
};

export default Search;

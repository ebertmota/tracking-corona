import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { Container, TabsContainer, TabItem, TabText } from './styles';

export default class Tabs extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    share: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Container>
        <TabsContainer>
          <TabItem onPress={() => this.props.navigate('Search')}>
            <Icon name="search" size={24} color="#FFF" />
            <TabText>Buscar por estado</TabText>
          </TabItem>
          <TabItem onPress={() => this.props.share()}>
            <SearchIcon name="whatsapp" size={24} color="#FFF" />
            <TabText>Compartilhar no WhatsApp</TabText>
          </TabItem>
          <TabItem onPress={() => this.props.update()}>
            <Icon name="refresh" size={24} color="#FFF" />
            <TabText>Atualizar dados</TabText>
          </TabItem>
          <TabItem onPress={() => this.props.navigate('Search')}>
            <Icon name="more" size={24} color="#FFF" />
            <TabText>Mais informações</TabText>
          </TabItem>
          <TabItem onPress={() => this.props.navigate('About')}>
            <Icon name="info" size={24} color="#FFF" />
            <TabText>Sobre</TabText>
          </TabItem>
        </TabsContainer>
      </Container>
    );
  }
}

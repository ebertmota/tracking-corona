import React, { Component } from 'react';
import { Browser } from './styles';

class Details extends Component {
  render() {
    return <Browser source={{ uri: 'https://covid.saude.gov.br/' }} />;
  }
}

export default Details;

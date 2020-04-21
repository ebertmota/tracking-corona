import React, { Component } from 'react';
import { Browser, Spinner } from './styles';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  displaySpinner = () => {
    return <Spinner size="large" color="#C04848" />;
  };

  render() {
    return (
      <Browser
        startInLoadingState={true}
        source={{ uri: 'https://covid.saude.gov.br/' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        renderLoading={() => this.displaySpinner()}
      />
    );
  }
}

export default Details;

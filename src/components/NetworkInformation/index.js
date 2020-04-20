import React, { useState, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Message } from './styles';

function NetworkInformation() {
  const netInfo = useNetInfo();
  const [messageConnection, setMessageConnection] = useState('Conectado!');

  useEffect(() => {
    if (netInfo.isConnected) {
      setMessageConnection('Conectado!');
    } else {
      setMessageConnection('Desconectado!');
    }
  }, [netInfo]);

  return (
    <Container connected={messageConnection}>
      {messageConnection === 'Conectado!' ? (
        <Icon name="signal-wifi-4-bar" size={16} color="#639a67" />
      ) : (
        <Icon name="signal-wifi-off" size={16} color="#ff6363" />
      )}

      <Message color={messageConnection}>{messageConnection}</Message>
    </Container>
  );
}

export default NetworkInformation;

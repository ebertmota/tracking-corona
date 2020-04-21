import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

import { WebView } from 'react-native-webview';

export const Browser = styled(WebView)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Spinner = styled(ActivityIndicator)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

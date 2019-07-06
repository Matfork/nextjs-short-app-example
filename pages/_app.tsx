import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../src/app/shared/redux/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/material/theme';
import { ThemeProvider } from '@material-ui/styles';
import { _C } from '../src/app/shared/utils/constants';
import { DatabaseStorageService } from '../src/app/shared/services/DataStorage.service';

class CustomApp extends App {
  async componentDidMount() {
    await DatabaseStorageService.initialize();

    // Remove the server-side injected CSS.
    const jssStyles: any = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store }: any = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

CustomApp.getInitialProps = async ({ Component, ctx }: any) => {
  console.log('CustomApp', _C.IS_BROWSER);

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  return { pageProps };
};

export default withRedux(createStore)(withReduxSaga(CustomApp));

import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { PageTransition } from 'next-page-transitions';
import withApolloClient from '../lib/with-apollo-client';
import Header from '../components/Header';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <div>
            <Header />
            <PageTransition timeout={300} classNames="page-transition">
              <Component {...pageProps} />
            </PageTransition>
            <style jsx global>
              {`
                .page-transition-enter {
                  opacity: 0;
                }
                .page-transition-enter-active {
                  opacity: 1;
                  transition: opacity 300ms;
                }
                .page-transition-exit {
                  opacity: 1;
                }
                .page-transition-exit-active {
                  opacity: 0;
                  transition: opacity 300ms;
                }
              `}
            </style>
          </div>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);

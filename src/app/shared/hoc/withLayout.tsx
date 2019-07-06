import React from 'react';
import Layout from '../components/Layout';

export const withLayout = (WrappedComponent: any = null): any => {
  return class extends React.Component {
    render() {
      return (
        <Layout>
          <WrappedComponent {...this.props} />
        </Layout>
      );
    }
  };
};

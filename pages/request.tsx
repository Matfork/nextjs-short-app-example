import React from 'react';
import { connect } from 'react-redux';

import Head from 'next/head';
import { withLayout } from '../src/app/shared/hoc/withLayout';
import RequestListRequestComponent from '../src/app/modules/components/request/RequestList.request.component';

import './css/Request.scss';

class _Request extends React.Component<any> {
  static getInitialProps = async ({ ctx }: any) => {};

  componentDidMount() {}

  render() {
    return (
      <div className="request-page">
        <Head>
          <title>Request page</title>
        </Head>
        <h1>Requests</h1>
        <div className="requestlist-component">
          <RequestListRequestComponent />
        </div>
      </div>
    );
  }
}

const Review = withLayout(_Request);

export default connect()(Review);

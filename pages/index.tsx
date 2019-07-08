import React from 'react';
import { connect } from 'react-redux';

import Head from 'next/head';
import { withLayout } from '../src/app/shared/hoc/withLayout';

class _Review extends React.Component<any> {
  static getInitialProps = async ({ ctx }: any) => {};

  componentDidMount() {}

  render() {
    return (
      <div className="review-component">
        <Head>
          <title>Review | S Bank</title>
        </Head>
        <h1>Reviews</h1>
        <div>TODO</div>
      </div>
    );
  }
}

const Review = withLayout(_Review);

export default connect()(Review);

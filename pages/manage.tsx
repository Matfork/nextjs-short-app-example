import React, { Component } from 'react';
import MenuManageComponent from '../src/app/modules/components/manage/Menu.manage.component';
import DescriptionManageComponent from '../src/app/modules/components/manage/Description.manage.component';
import { withLayout } from '../src/app/shared/hoc/withLayout';
import Head from 'next/head';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onMenuRequest } from './../src/app/shared/redux/actions/menu.actions';
import './css/Manage.scss';

interface ManagePageProps {
  onMenuRequest: Function;
}

class Manage extends Component<ManagePageProps> {
  state = {
    key: null
  } as {
    key: number | null;
  };

  componentDidMount() {
    this.props.onMenuRequest();
  }

  handleKeySelected = (newKey: number) => {
    this.setState({
      key: newKey
    });
  };

  render() {
    const { key } = this.state;
    return (
      <div className="manage-page">
        <Head>
          <title>Manage | S Bank</title>
        </Head>
        <h1>Manage Data</h1>

        <div className="manage-content">
          <div className="menu">
            <MenuManageComponent
              onKeySelected={(newKey: number) => this.handleKeySelected(newKey)}
            />
          </div>

          <div className="description">
            <DescriptionManageComponent menuId={key} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ onMenuRequest }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(withLayout(Manage));

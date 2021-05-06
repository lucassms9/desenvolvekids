import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './routes';
import '~/config/StatusBar';
import { initNotification } from '~/services/notificationService';

class Root extends Component {
  constructor(properties) {
    super(properties);
  }

  async componentDidMount() {
    const { authCheck } = this.props;

    if (authCheck) {
      initNotification();
    }
  }

  render() {
    return <Routes />;
  }
}

const mapStateToProps = ({ auth: { authCheck } }) => ({
  authCheck,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

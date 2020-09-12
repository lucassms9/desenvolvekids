import React, { Component } from 'react';
import { connect } from 'react-redux';
import createNavigator from './routes';

class Root extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { authCheck } = this.props;
  }

  render() {
    const { user } = this.props;
    const Routes = createNavigator(user);
    return <Routes />;
  }
}

const mapStateToProps = ({ auth: { authCheck, user } }) => ({
  authCheck,
  user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

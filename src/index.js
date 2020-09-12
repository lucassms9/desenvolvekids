import React from 'react';
import { connect } from 'react-redux';
import Routes from './routes';

const Root = ({ user, authCheck }) => {
  return <Routes />;
};

const mapStateToProps = ({ auth: { authCheck, user } }) => ({
  authCheck,
  user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

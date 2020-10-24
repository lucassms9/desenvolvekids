import React from 'react';
import { connect } from 'react-redux';
import Routes from './routes';

const Root = (props) => {
  return <Routes />;
};

const mapStateToProps = ({ auth: { authCheck } }) => ({
  authCheck,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { colors, commons } from '~/styles';

function HeaderComponent({ title, isBack }) {
  const leftComp = isBack ? { icon: 'menu', color: colors.white } : {};

  return (
    <Header
      placement="center"
      leftComponent={leftComp}
      centerComponent={{
        text: title,
        style: { color: colors.white, ...commons.pageTitle },
      }}
      rightComponent={{ icon: 'home', color: colors.white, size: 30 }}
    />
  );
}

export default HeaderComponent;

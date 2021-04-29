import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { commons, colors } from '~/styles';
import Header from '~/components/Header';
import Loader from '~/components/Loader';
import api from '~/services/api';
import { Input } from 'react-native-elements';
import ButtonPrimary from '~/components/ButtonPrimary';

import { validateEmail } from '~/helpers/validateFunctions';
import styles from './styles';
function Recover() {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {});

  const checkEmail = () => {
    const result = {
      status: 1,
      message: '',
    };

    if (!email) {
      result.status = 0;
      result.message = 'Preencher o campo E-mail';
      return result;
    }
    if (!validateEmail(email)) {
      result.status = 0;
      result.message = 'E-mail Inválido';
      return result;
    }

    return result;
  };

  const handleSubmit = async () => {
    try {
      const check = checkEmail();
      setError(false);

      if (!check.status) {
        return setError(check.message);
      }
      const res = await api.post('login/recuperar-senha', { email });
      setError(res.message);
    } catch (error) {
      return setError(error.message);
    }
  };

  return (
    <View style={commons.body}>
      <Header hasBack title="Recuperar Senha" hasntProfile />
      <SafeAreaView style={styles.container}>
        <View>
          <Input
          
            value={email}
            label={'E-mail'}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder={'E-mail'}
            onChangeText={setEmail}
            onSubmitEditing={() => {}}
          />
          {error && <Text style={commons.error}>{error}</Text>}
          <ButtonPrimary
            loading={status === 'loading'}
            text="RECUPERAR SENHA"
            onPress={handleSubmit}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Recover;

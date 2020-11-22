import React, { useEffect, useState } from 'react';

import { Icon } from 'react-native-elements';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { permissionCamera } from '~/services/permissions';
import cameraService from '~/services/cameraService';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import { commons, colors } from '~/styles';

import styles from './styles';

function ActivityComplete({ navigation, route }) {
  const { activity } = route.params;

  const [status, setStatus] = useState('');
  const [imageTake, setImageTake] = useState(false);
  const [dificul, setDificul] = useState(null);

  const activityComplete = () => {
    navigation.navigate('ActivityComplete');
  };

  const takePhoto = async () => {
    try {
      await permissionCamera();
      const res = await cameraService();
      console.log(res);
      setImageTake(`data:image/jpeg;base64,${res.data}`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  console.log(imageTake);
  return (
    <View style={commons.body}>
      <Header title="Atividade" hasBack />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[commons.container, { flex: 1 }]}>
          <View style={{ flex: 0.2 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
              Parabéns! atividade concluída com sucesso!
            </Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <ButtonPrimary
              text={!imageTake ? 'Enviar Comprovação' : 'Reenviar Comprovação'}
              onPress={takePhoto}
              icon={
                imageTake ? (
                  <Icon name="check" type="feather" color="#fff" />
                ) : null
              }
            />

            <View>
              {/* {imageTake && (
                <Image
                  style={{ marginTop: 10 }}
                  width={200}
                  height={200}
                  source={{
                    uri: imageTake,
                  }}
                />
              )} */}
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View>
              <Text style={{ color: '#fff' }}>Questionário:</Text>
            </View>
            <View>
              <Text style={{ color: '#fff', fontSize: 15, marginBottom: 10 }}>
                Dificuldade:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity onPress={() => setDificul('Vermelho')}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 15,
                      backgroundColor: '#f00',
                      opacity: dificul === 'Vermelho' ? 0.5 : 1,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDificul('Amarelo')}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 15,
                      backgroundColor: '#ff0',
                      opacity: dificul === 'Amarelo' ? 0.5 : 1,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDificul('Verde')}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 15,
                      backgroundColor: '#0f0',
                      opacity: dificul === 'Verde' ? 0.5 : 1,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 0.1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
            }}>
            <ButtonPrimary text="Enviar Dados" onPress={() => {}} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ActivityComplete;

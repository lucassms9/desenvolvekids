import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import { Creators as AuthActions } from '~/store/ducks/auth';

import { SafeAreaView, ScrollView, View, Text } from 'react-native';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import MainCarousel from '~/components/MainCarousel';
import ItemPage from '~/components/ItemPage';
import { commons, colors } from '~/styles';

function ActivityDetail({ navigation, route }) {
  const { activity } = route.params;

  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [imagesCarousel, setImagesCarousel] = useState([]);

  const activityComplete = () => {
    navigation.navigate('ActivityComplete', {
      activity,
    });
  };
  //responsavel por renderizar as imagens
  const renderImages = (image) => {
    console.log(image);
    imagesCarousel.push([image.conteudo]);
  };

  const nextPage = () => {
    if (isLastPage) {
      return activityComplete();
    }
    return setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(0);
    setIsLastPage(false);
  }, []);
  //definir se e a ultima page ou nao
  useEffect(() => {
    //seta as imagens
    const imagens = activity.conteudos[currentPage].conteudos_itens
      .filter((item) => {
        if (item.tipo === 'imagem') {
          return item;
        }
      })
      .map((img) => img.conteudo);
    if (imagens.length > 0) {
      setImagesCarousel(imagens);
    } else {
      setImagesCarousel([]);
    }
    if (activity.conteudos.length === 0) {
      return setIsLastPage(true);
    }

    if (activity.conteudos.length - 1 === currentPage) {
      return setIsLastPage(true);
    }

    return setIsLastPage(false);
  }, [currentPage]);

  const backPage = () => {
    if (currentPage > 0) {
      return setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={commons.body}>
      <Header title="Atividade" hasBack />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 100 }]}>
          <ScrollView>
            <View>
              {imagesCarousel.length > 0 && (
                <MainCarousel imagens={imagesCarousel} />
              )}
            </View>

            <View style={{ marginTop: 10, marginHorizontal: 8 }}>
              <View>
                {activity.conteudos[currentPage].conteudos_itens.map((item) => (
                  <ItemPage item={item} />
                ))}
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '45%' }}>
                  {currentPage > 0 && (
                    <ButtonPrimary text="Voltar" onPress={backPage} />
                  )}
                </View>
                <View style={{ width: '45%' }}>
                  <ButtonPrimary
                    text={isLastPage ? 'Concluir Atividade' : 'Avançar'}
                    onPress={nextPage}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ActivityDetail;

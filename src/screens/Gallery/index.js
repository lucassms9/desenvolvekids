import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { PricingCard } from 'react-native-elements';

import { commons, colors } from '~/styles';
import Header from '~/components/Header';
import Loader from '~/components/Loader';
import api from '~/services/api';

import ImageLayout from 'react-native-image-layout-wrapper';

function Gallery({ navigation }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImages = async () => {
    setLoading(true);
    try {
      const res = await api.post('user/get-galeria');
      console.log(res);
      const handle = res.galerias.map((gal) => ({
        uri: gal.imagem,
        id: gal.id,
      }));
      setImages(handle);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getImages();
  }, []);

  return (
    <View style={commons.body}>
      <Header title="Planos" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {loading && <Loader />}
          {!loading && (
            <ImageLayout
              sorted
              backgroundColor="#1a4c65"
              enableModal
              images={images}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Gallery;

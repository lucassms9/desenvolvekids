import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { PricingCard } from 'react-native-elements';

import { commons, colors } from '~/styles';
import Header from '~/components/Header';
import Loader from '~/components/Loader';
import NotFound from '~/components/NotFound';
import api from '~/services/api';

import ImageLayout from 'react-native-image-layout-wrapper';

function Gallery({ navigation }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImages = async () => {
    setLoading(true);
    try {
      const res = await api.post('user/get-galeria');
      
      // { source: 
      //   { 
      //     uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg", 
      //     dimensions: { width: 1080, height: 1920 } , 
      //   }, 
      // },

      const handle = res.galerias.map((gal) => ({
        source:{
          uri: gal.imagem,
          id: gal.id,
          dimensions: { width: 1080, height: 1920 } , 
        }
      }));
      console.log(handle);
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
      <Header hasBack title="Galeria" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#1a4c65' }}>
          {loading && <Loader />}
          {images.length === 0 && <NotFound type="fotos" />}
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

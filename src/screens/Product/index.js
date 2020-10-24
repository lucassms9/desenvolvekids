import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Creators as ProductActions } from '~/store/ducks/product';

import Header from '~/components/Header';
import SliderEntry from '~/components/SliderEntry';
import Loader from '~/components/Loader';
import TryAgain from '~/components/TryAgain';

import { maskMoney } from '~/helpers';
import { commons, colors } from '~/styles';
import { Image, Text } from 'react-native-elements';
import api from '~/services/api';
import ButtonPrimary from '~/components/ButtonPrimary';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';

import { itemWidth, sliderWidth } from './styles';
import { ScrollView } from 'react-native-gesture-handler';

function Product(props) {
  const { route, navigation, addProduct } = props;
  const { productId } = route.params;
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [status, setStatus] = useState('');
  const [itemCount, setItemCount] = useState(1);
  const [sliderRef, setSliderRef] = useState(null);
  const [sliderActiveSlide, setSliderActiveSlide] = useState();

  const addProductAct = () => {
    addProduct(productId, itemCount);
    navigation.navigate('Cart');
  };

  const renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  };

  const getProduct = async () => {
    try {
      setStatus('loading');
      const response = await api.post('/produtos/get', {
        produto_id: productId,
      });
      const handleImages = response.produto.imagens.map((prod) => prod.imagem);
      setProductImages(handleImages);

      setProduct(response.produto);
      setStatus('success');
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const decreaseItem = () => {
    const handle = itemCount > 0 ? itemCount - 1 : itemCount;
    setItemCount(handle);
  };
  const addItem = () => {
    const handle = itemCount + 1;
    setItemCount(handle);
  };

  return (
    <View style={commons.body}>
      <Header title="Produto name" hasBack />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[commons.container, { paddingBottom: 70, flex: 1 }]}>
          {status === 'loading' && <Loader />}
          {status === 'error' && <TryAgain tryAgain={getProduct} />}
          {status === 'success' && (
            <>
              <View style={{ flex: 1 }}>
                <Carousel
                  ref={(c) => setSliderRef(c)}
                  data={productImages}
                  renderItem={renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={sliderActiveSlide}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  enableMomentum={true}
                  onSnapToItem={(index) => setSliderActiveSlide(index)}
                />
                <Pagination
                  dotsLength={product.imagens.length}
                  activeDotIndex={sliderActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.white}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={sliderRef}
                  tappableDots={!!sliderRef}
                />
              </View>
              <ScrollView style={{ flex: 1 }}>
                <Text style={{ color: '#fff' }} h4>
                  {product.nome}
                </Text>
                <View style={{ marginTop: 15 }}>
                  <Text style={{ color: '#fff', fontSize: 20 }}>
                    Descrição do Produto:
                  </Text>

                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>
                      {product.descricao}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 30,
                      flexDirection: 'column',
                    }}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>
                      Quantidade
                    </Text>
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            decreaseItem();
                          }}>
                          <Feather
                            name="minus-circle"
                            size={20}
                            color={'#fff'}
                          />
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 17,
                            paddingHorizontal: 10,
                          }}>
                          {itemCount}
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            addItem();
                          }}>
                          <Feather
                            name="plus-circle"
                            size={20}
                            color={'#fff'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'column',
                  top: 17,
                }}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginBottom: 5,
                    marginRight: 5,
                  }}>
                  <Text style={{ color: '#fff', fontSize: 19 }}>
                    Total: {maskMoney(product.preco * itemCount)}
                  </Text>
                </View>
                <ButtonPrimary onPress={addProductAct} text={'COMPRAR'} />
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = ({ cart }) => ({
  cart,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...ProductActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Product);

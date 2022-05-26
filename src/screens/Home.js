import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image,
  FlatList, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const numCol = 2;
const dataButton = [
  {id: 1, image: images.apollo, background: images.apolloInfo}, 
  {id: 2, image: images.ares, background: images.aresInfo}, 
  {id: 3, image: images.demeter, background: images.demeterInfo}, 
  {id: 4, image: images.poseidon, background: images.poseidonInfo}, 
  {id: 5, image: images.zeus, background: images.zeusInfo}];

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Info", {image: item});
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.buy} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={images.banner} style={appStyle.welcomeImage} />
      <FlatList 
        data={dataButton}
        style={{marginTop: 10}}
        numColumns={numCol}
        scrollEnabled={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onClickStartButton(item.background)} key={item.id}>
            <Image source={item.image} style={appStyle.successImage} />
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  appBar: {
    marginTop: 10,
    flex: 0.1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  turnView: {
    width: windowWidth * 0.15,
    paddingTop: 40,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeImage: {
    marginTop: 50,
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    resizeMode: 'cover',
  },
  successImage: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    margin: 10,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Home;
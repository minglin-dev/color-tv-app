import React, { useState, useEffect } from "react";
import Swiper from 'react-native-swiper/src';
import { StyleSheet, Image } from "react-native";

const PhotoDetail = ({ navigation }) => {
  const {images, curIndex} = navigation.state.params;

  return (
    <Swiper style={styles.wrapper} showsButtons={true}>
      {images && images.map((image) => (
        <Image style={styles.fullImage} key={image.id} source={{ uri: image.urls.full }} />
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
    wrapper: {},
    fullImage: {
        width: '100%',
        height: '100%'
    }
});

export default PhotoDetail;

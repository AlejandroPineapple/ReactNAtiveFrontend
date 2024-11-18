import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import colors from '../config/colors';

function ViewImage(props) {
    return (
        <View style = {styles.container}>
            <View style = {styles.closeIcon}/>
            <View style = {styles.deleteIcon}/>
            <Image
            style={styles.image}
            source={require('../assets/chair.jpg')}
            />
        </View>
    );
}

export default ViewImage;

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: colors.black
    },
    image:
    {
        resizeMode: 'contain',
        width: '100%',
        height: "100%"
    },
    closeIcon:
    {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 80,
        left: 30,
        backgroundColor: colors.primary,
        borderRadius: 5
    },
    deleteIcon:
    {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 80,
        right: 30,
        backgroundColor: colors.secondary,
        borderRadius: 5
    }
})


import React from 'react';
import {View , Text , StyleSheet , TouchableOpacity } from 'react-native';
import Colors from '../constants/colors'

const MainButton = props => {

return (
    
    <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress = {props.onPress}>
        <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
        </View>
        </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
    button : {
        borderRadius :25 ,
        overflow : 'hidden'
    },
    buttonText : {
        color : 'white' , 
        //fontFamily : 'open-sans',
        fontSize : 18
    }
});
export default MainButton;
import React from 'react';
import {View , Text , StyleSheet , TouchableOpacity , TouchableNativeFeedback , Platform} from 'react-native';
import Colors from '../constants/colors'

const MainButton = props => {

    let ButtonComponent = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version > 21){
        ButtonComponent = TouchableNativeFeedback;
    }
return (
    /*<TouchableOpacity activeOpacity={0.8} onPress = {props.onPress}>
    <View style={styles.button}>
     <Text style={styles.buttonText}>{props.children}</Text>
    </View>
    </TouchableOpacity>*/
    <View style={styles.buttonContainer}>
        <ButtonComponent activeOpacity={0.8} onPress = {props.onPress}>
        <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
        </View>
        </ButtonComponent>
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
    },
    buttonContainer : {
        backgroundColor : Colors.primary,
        paddingVertical : 12,
        paddingHorizontal : 30,
        borderRadius :25
    },
});
export default MainButton;
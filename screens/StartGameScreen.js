import {React , useState , useEffect} from 'react';
import {View , Button , StyleSheet , Dimensions, TouchableWithoutFeedback , 
        Keyboard ,Alert ,ScrollView ,KeyboardAvoidingView} from 'react-native';
import Card  from '../components/Card';
import Input from '../components/Input'
import Colors from '../constants/colors'
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue , setEnteredValue] = useState('');
    const [confirmed , setConfirmed] = useState(false);
    const [selectedNumber , setSelectedNumber] = useState();
    const [buttonWidth , setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
      };
    const resetInputHandler = () =>{
        setEnteredValue('');
        setConfirmed(false);
    }
    const confirmedInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
          Alert.alert(
            'Invalid number!',
            'Number has to be a number between 1 and 99.',
            [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
          );
          return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
      };
    
      useEffect(() => {
        const updateLayout = () => {
          Dimensions.get('window').width / 4
        }
    
        const subscription = Dimensions.addEventListener('change' , updateLayout);

        return () =>{
          //Dimensions.remove('change' , updateLayout);
          subscription.remove();
        }
      } );
   
  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText style = {styles.inputContainer}>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
      </Card>
    );
  }

    return(
        /*<TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>*/
      <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <View style={styles.screen}>
           <TitleText style={styles.title}>Start a New Game!</TitleText>
           <Card style={styles.inputContainer}>
            <BodyText>Select a Number</BodyText>
            <Input style={styles.input} 
                   blurOnSubmit 
                   autoCapitalize='none' 
                   autoCorrect={false} 
                   keyboardType='number-pad'
                   maxLength={2}
                   onChangeText={numberInputHandler}
                   value={enteredValue}
                   />
            <View style={styles.buttonContainer}>
            <View style={{width : buttonWidth}}>
                <Button title="RESET" onPress={resetInputHandler} color={Colors.accent} />
            </View>
            <View style={{width : buttonWidth}}>
                <Button title="CONFIRM" onPress={confirmedInputHandler} color={Colors.primary} />
            </View>
            </View>
           </Card>
           {confirmedOutput}
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
        //</TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen : {
    flex : 1 ,
    padding : 10,
    alignItems : 'center',
    justifyContent : 'flex-start'
    },
    title : {
    fontSize : 20,
    marginVertical : 10,
    //fontFamily : 'open-sans-bold'
    },
    inputContainer : {
    flex : 1 ,
    justifyContent : 'center',
    width : '80%',
    maxWidth : '95%',
    minWidth : 300,
    alignItems : 'center'
    },
    buttonContainer : {
    flexDirection : 'row',
    width : '100%',
    justifyContent : 'space-between',
    paddingHorizontal : 15
    },
    button : {
        //width : 120
        width : Dimensions.get('window').width / 4
    },
    input : {
        width : 50,
        textAlign : 'center'
    },
    text : {
        //fontFamily : 'open-sans'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
        height : '50%'
      }
});

export default StartGameScreen;
import React , {useState} from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Header from './components/Header';
import * as Font from 'expo-font'
import { AppLoading } from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {

  const [userNumber , setUserNumber] = useState();
  const [guessRounds , setGuessRounds] = useState(0);
  const [dataLoaded , setDataLoaded] = useState(false);
  /*if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }*/

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  }
  
  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }
  
  let content =  <StartGameScreen onStartGame = {startGameHandler}/>;

  if(userNumber && guessRounds <= 0){
    content = (<GameScreen userChoice = {userNumber} onGameOver = {gameOverHandler}/>);
  }else if(guessRounds > 0){
    content = (<GameOverScreen  roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number!"></Header>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //fontFamily : 'open-sans-bold',
    alignItems : 'center',
    justifyContent : 'flex-start',
    width : '100%'
  }
});
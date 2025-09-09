import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import Colors from "./constants/colors";
import { useFonts } from 'expo-font';

import GameScreen from './screens/GameScreen';
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import AppLoading from "expo-app-loading";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }

    function gameOverHandler() {
        setGameIsOver(true);
    }

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
    }

    if (gameIsOver && userNumber) {
        screen = <GameOverScreen />;
    }



    return (
        <>
            <StatusBar style="auto" />
            <LinearGradient colors={[Colors.primary700 ,Colors.accent500]} style={styles.rootScreen}>
                <ImageBackground
                    style={styles.rootScreen}
                    resizeMode="cover"
                    source={require('./assets/images/background.png')}
                    imageStyle={styles.backgroundImage}
                >
                    <SafeAreaView style={styles.rootScreen}>
                        {screen}
                    </SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});

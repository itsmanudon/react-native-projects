import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    // We generate an initial guess between 1 and 100 excluding the userNumber
    // We use useState to keep track of the current guess
    // The initial guess is generated only once when the component mounts
    const initialGuess = generateRandomBetween(
        1,
        100,
        userNumber
    );
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();

            // Alert.alert('Game Over!',
            //     `The opponent guessed your number ${userNumber}`,
            //     [{ text: 'OK', style: 'default' }]
            // );
        }
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction) {
        // direction => 'lower', 'greater'
        if ((direction === 'lower' && currentGuess < userNumber) ||
        (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!",
                "You know that this is wrong...",
                [{ text: 'Sorry!', style: 'cancel'}]
            );
            return;
        }
        // Adjust the boundaries based on the user's hint

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        console.log(minBoundary, maxBoundary, direction);
        const newRndNumber = generateRandomBetween(
            minBoundary,
            maxBoundary,
            userNumber
        );
        setCurrentGuess(newRndNumber);
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or Lower?</Text>
                <View>
                    {/*The bind allows use to pre-configure the function with an argument
                    so that when the button is pressed, it calls nextGuessHandler with 'lower' or 'greater'
                    We could also use an arrow function like onPress={() => nextGuessHandler('lower')}
                    but bind is more efficient in this case because it doesn't create a new function on each render.*/}

                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
                </View>
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },

});
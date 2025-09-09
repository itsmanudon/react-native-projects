import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

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
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    {/*The bind allows use to pre-configure the function with an argument
                    so that when the button is pressed, it calls nextGuessHandler with 'lower' or 'greater'
                    We could also use an arrow function like onPress={() => nextGuessHandler('lower')}
                    but bind is more efficient in this case because it doesn't create a new function on each render.*/}
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
});
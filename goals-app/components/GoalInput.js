import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Modal,
    Image,
} from 'react-native';

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim().length === 0) {
      return; // Do not add empty goals
    }
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText(""); // Clear input after adding
  }

  return (
      <Modal visible={props.visible} animation="slide">
        <View style={styles.inputContainer}>
            <Image style={styles.image} source={require('../assets/images/goal.png')} />
            <TextInput
                style={styles.textInput}
                value={enteredGoalText}
                onChangeText={goalInputHandler}
                placeholder="Your goal"
            />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Add Goal" onPress={addGoalHandler} color="#5e0acc"/>
                </View>
                <View style={styles.button}>
                    <Button title="Cancel" onPress={props.onCancel} color="#f31282"/>
                </View>
            </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b',
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        borderRadius: 6,
        color: '#120438',
        width: '100%',
        padding: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    button: {
        width: 100,
        marginHorizontal: 8,
    },
});

export default GoalInput;
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

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
            <TextInput
                style={styles.textInput}
                value={enteredGoalText}
                onChangeText={goalInputHandler}
                placeholder="Your goal"
            />
            <Button title="Add Goal" onPress={addGoalHandler} />
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8,
    },
});

export default GoalInput;
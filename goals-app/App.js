import { useState } from 'react';
import { 
    StyleSheet,
    View,
    FlatList,
    Button,
} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
      setModalIsVisible(true);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals, 
      // Using a random ID to provide a unique, stable identifier for each goal item
      // This helps React efficiently update and re-render list items when the list changes
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
        <Button
            title="Add New Goal"
            color="#5e0acc"
            onPress={() => startAddGoalHandler()}
        />
        {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} /> }
      {/* ScrollView allows for scrolling when the content exceeds the screen size. We wrapped it
      with a View because styling ScrollView directly can be problematic. The View container gives
      us more control over the layout and styling of the scrollable content. */}
      <View style={styles.goalsContainer}>
        {/* ScrollView renders all items at once, which can cause performance issues with long lists.
        FlatList is more efficient as it only renders items that are currently visible on screen.
        Use ScrollView for small, fixed-length lists and FlatList for longer or dynamic lists. */}
        
        {/* <ScrollView>
          {courseGoals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView> */}

        {/* Using key prop with index to help React efficiently update and re-render list items.
        While using index as a key works for simple, static lists, it's generally recommended 
        to use unique, stable identifiers (like IDs) when possible, especially for lists that 
        can change (items being added, removed, or reordered). However, for a simple goals list 
        that doesn't change dynamically, using the index is acceptable.*/}
        <FlatList 
          data={courseGoals} 
          renderItem={(itemData) => {
            return (
              <GoalItem 
                text={itemData.item.text} 
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }} 
          keyExtractor={(item, index) => {
            return item.id;
          }}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  // Setting the flex ratio between the input container and the goals container 1:5
  goalsContainer: {
    flex: 5,
  },
});

import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

function PrimaryButton({ children, onPress }) {
    // You can define the pressHandler here or pass it as a prop
    // depending on your use case.

    return (
        <View style={styles.buttonOuterContainer}>
            {/*The Pressable component provides feedback when pressed. We take a
            function to receive that feedback and passed the styles in an array
            conditionally such that when the button is pressed the opacity reduces.
            We can pass array of styles and all those styles will be applied.*/}
            <Pressable
                style={({ pressed }) =>
                    pressed
                        ? [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer
                }
                onPress={onPress}
                android_ripple={{ color: Colors.primary600 }} // ripple effect for Android
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden', // to ensure ripple effect doesn't go outside the button
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2, // for Android shadow
        shadowColor: 'black', // for iOS shadow
        shadowOffset: { width: 0, height: 2 }, // for iOS shadow
        shadowRadius: 6, // for iOS shadow
        shadowOpacity: 0.25, // for iOS shadow
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
    buttonContainer: {
        flex: 1,
    },
});
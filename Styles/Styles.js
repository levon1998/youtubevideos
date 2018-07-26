import {StyleSheet, Platform} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
    },
    WebViewContainer: {
        marginTop: (Platform.OS == 'ios') ? 20 : 0,
    }
});

export default styles;
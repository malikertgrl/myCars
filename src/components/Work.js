import React, { useState } from "react"
import { View, Text, Button } from "react-native"

const Work = () => {
    const [value, setValue] = useState(0);

    const increase = () => {
        setValue(prevState => prevState + 1)
    }

    const decrease = () => {
        setValue(prevState => prevState - 1)
    }


    return (
        <View style={styles.buttonStyle}>
            <Text style={{ borderWidth: 2, paddingHorizontal: 30, marginVertical: 5 }}>{value}</Text>
            <Button
                title="arttır"
                onPress={() => increase()}
            />

            <Button
                color="red"
                title="azalt"
                onPress={() => decrease()}
            />
        </View>
    )
}

const styles = {
    buttonStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }
}

export default Work;
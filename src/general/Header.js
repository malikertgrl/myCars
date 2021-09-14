import React from "react";
import {Text, View} from "react-native";

const Header = (props) => {
    const {textStyle,viewStyle} = styles;
    return(
        <View style = {viewStyle}>
             
            <Text style = {textStyle}>{props.title}</Text>
        </View>
        
    )
}

const styles = {
    textStyle:{
        fontSize:20,
       

    },
    viewStyle:{
        backgroundColor:"#f8f8f8",
        height:60,
        justifyContent: "center",
        alignItems: "center",
        elevation:3
        
    }
}

export default Header;
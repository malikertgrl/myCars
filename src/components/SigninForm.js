import React, { useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { Card, CardSection, Button, Spinners } from "../general";
import { loginUser, inputChange } from "../actions/index";
import { connect } from "react-redux";


const SignInForm = ({ email, password, loading, inputChange, loginUser }) => {

    useEffect(() => {
        console.log("password: ", password);
        inputChange({ props: "password", value: "" })
        inputChange({ props: "email", value: "" })

    }, [])


    const clickLogin = () => {
        loginUser({ email, password })

    }


    // const renderButton = () => {
    //     if (!loading) {
    //         return (
    //             <Button onPress={clickLogin()}>Kayıt Ol</Button>
    //         )
    //     }
    //     return <Spinners />;
    // }

    return (
        <Card>
            <CardSection>
                <TextInput
                    placeholder="E-mail"
                    style={styles.inputStyle}
                    value={email}
                    onChangeText={email => inputChange({ props: "email", value: email })}

                />
            </CardSection>

            <CardSection>
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    style={styles.inputStyle}
                    value={password}
                    onChangeText={password => inputChange({ props: "password", value: password })}

                />
            </CardSection>

            <CardSection>
                {loading && <Spinners />}
                {!loading && <Button onPress={() => clickLogin()}>Giriş Yap</Button>}
            </CardSection>
        </Card>
    )
}

const mapStateToProps = ({ AuthenticationResponse }) => {
    const { email, password, loading } = AuthenticationResponse;
    return {
        email, password, loading
    };
}

const styles = {


    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    }

}

export default connect(mapStateToProps, { inputChange, loginUser })(SignInForm);
import React, {  } from "react";
import { TextInput, Alert } from "react-native";
import { Button, Card, CardSection, Spinners } from "../general"
import { inputChange, loginUser,} from "../actions/index"
import { connect } from "react-redux";



const LoginForm = ({
    navigation,
    email,
    password,
    loading,
    user,
    inputChange,
    loginUser
}) => {
    


   const clickLogin = () => {
      
       
        loginUser({ email, password })

        console.log("clickLogin");
       
        // if (user) {
        // console.log("user");

           
        //      navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'Profile' }]
        //    })
       
        }
     
//   const renderButton = () => {

//         if (!loading) {
//             return (
//                 <Button onPress={() => clickLogin()}>Giriş Yap</Button>
//             )
//         }
//         return <Spinners />;
//     }
    


   


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
                  {loading && <Spinners /> }
                  {!loading && <Button onPress={() => clickLogin()}>Giriş Yap</Button>}
                </CardSection>
                <CardSection>
                

                <Button onPress={() =>navigation.navigate('SigninForm')}>Kayıt Ol</Button>

                </CardSection>
                
            </Card>
        )
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
const mapStateToProps = ({ AuthenticationResponse }) => {
    const { email, password, loading, user } = AuthenticationResponse;

    return {
        email:"malik.test@gmail.com",
        password,
        loading,
        user
    }

}
export default connect(mapStateToProps, { inputChange, loginUser, })(LoginForm);
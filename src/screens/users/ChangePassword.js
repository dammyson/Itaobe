import React, { Component } from 'react';
import { KeyboardAvoidingView, ImageBackground, ScrollView, StyleSheet, Dimensions, Text, View, ActivityIndicator, Alert, TouchableOpacity, AsyncStorage, TextInput } from 'react-native';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import colors from './../../resources/styles/colors'
import { Actions } from 'react-native-router-flux';
export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.state = {
            loading: false,
            passwordone: "",
            passwordtwo: "",
        }

    }
    componentDidMount() {
        AsyncStorage.getItem('email').then((value) => {
            if (value.toString() == '') {
                this.setState({ 'demail': "" })
            } else {

                this.setState({ 'demail': value.toString() })
            }

        })


    }

    componentWillMount() {
        if (this.props.email) {
            //  this.setState({email: this.props.email});
        }
    }



    checkLogin() {

        let mail = "";
        const { passwordone, passwordtwo} = this.state
        
        if (passwordone == "" || passwordtwo == "") {
            Alert.alert('Validation failed', 'Password field (s) cannot be empty', [{ text: 'Okay' }])
            return
        }

        this.setState({ loading: true })
        const formData = new FormData();
        formData.append('feature', "user");
        formData.append('action', "changePassword");
        formData.append('currentpwd', passwordone);
        formData.append('newpwd', passwordtwo);
        formData.append('pwdcheck', passwordtwo);

     
    
        fetch('https://www.ita-obe.com/mobile/v1/user.php', {
            method: 'POST', headers: {
                Accept: 'application/json',
            }, body: formData,
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ loading: false })
                console.warn(res);
                if (!res.error) {
                    Alert.alert(
                        'Alert',
                        'Passwprd changed proceed to login',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                          {text: 'OK', onPress: () => Actions.login()},
                        ],
                        { cancelable: false }
                      )
                } else {
                    Alert.alert('Login failed', res.message, [{ text: 'Okay' }])
                    this.setState({ loading: false })
                }


            }).catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert(error.message);
                this.setState({ loading: false })
            });

    }
    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                    <Text>Processing</Text>
                </View>
            );
        }
        return (
            <ImageBackground
                source={require('../../assets/imgfour.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.container}>
                    <KeyboardAvoidingView style={styles.textInputcontainer}>
                        <ScrollView >
                            <View style={{ paddingBottom: 300 }}>

                                <View style={styles.slidetop}>
                                    <Text style={styles.getW}>Change Password</Text>
                                    <Text style={styles.headW}></Text>
                                    <View style={styles.socialtop}>
                                    </View>
                                </View>
                                <View style={styles.slidemid}>

                                    <Text style={styles.headW}>Enter</Text>

                                    <View style={styles.card} >
                                        <TextInput
                                            placeholder="Old password"
                                            secureTextEntry
                                            placeholderTextColor='#000'
                                            returnKeyType="next"
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={styles.input}
                                            onChangeText={text => this.setState({ passwordone: text })}
                                        />
                                        <View style={styles.lineStyle} />

                                        <TextInput
                                            placeholder="New password"
                                            secureTextEntry
                                            placeholderTextColor='#000'
                                            returnKeyType="next"
                                            onSubmitEditing={() => this.passwordInputone.focus()}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={styles.input}
                                            onChangeText={text => this.setState({ passwordtwo: text })}
                                        />
                                    </View>


                                    <View style={styles.bottomtop}>
                                        <TouchableOpacity style={{ marginRight: 20 }}
                                            onPress={() => this.props.navigation.navigate('SignUp')} >
                                            <Text style={{ fontWeight: 'bold', marginRight: 20, }}>
                                                Forgot Password?
                            </Text>

                                        </TouchableOpacity>
                                    </View>


                                </View>

                                <View style={styles.slidebases}>
                                    <TouchableOpacity style={styles.buttonContainer}
                                        onPress={() => this.checkLogin()} >
                                        <Text style={styles.buttonText}
                                        >Sign In</Text>

                                    </TouchableOpacity>
                                    <View style={styles.bottom}>
                                        <Text >Dont have an account?</Text>
                                        <Text style={{ fontWeight: 'bold', marginLeft: 10, }}
                                            onPress={() => Actions.signup({ email: "jesus" })}
                                        >Sign Up</Text>
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 50
    },

    slidetop: {
        flex: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 2,
    },
    socialtop: {
        height: 25,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    slidemid: {
        flex: 4,
    },
    slidebases: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    input: {
        height: 40,
        marginBottom: 10,
        marginTop: 5,
        color: '#0c0c0c',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
        fontWeight: '400',
        backgroundColor: '#ffe6e6',


    },
    text: {
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
        marginRight: 25,
        textAlign: 'center',
    },
    buttonContainer: {
        height: 45,
        backgroundColor: colors.bg_color,
        borderRadius: 30,
        alignItems: 'center',
        width: 300,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',

    },
    buttonText: {
        textAlign: 'center',
        color: "#fff",
        fontWeight: '700',
        fontSize: 18,
    },
    headTextW: {
        color: "#FFF",
        fontWeight: '900',
        fontSize: 15,
        textAlign: 'left',
        marginTop: 15
    },
    getW: {
        color: "#000",
        fontWeight: '500',
        fontSize: 30,
        textAlign: 'left',
        marginBottom: 25,
        marginLeft: 20,
        marginRight: 20,
    },
    bottom: {
        height: 30,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    bottomtop: {
        height: 30,
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20
    },
    card: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        paddingBottom: 10,
        paddingTop: 10,


    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#cfd0d1',

    },
    headW: {
        color: "#7a7a7a",
        fontWeight: '900',
        fontSize: 19,
        textAlign: 'left',
        marginBottom: 10,
        marginLeft: 25,
        marginTop: 10,
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        padding: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        margin: 20
    },

})

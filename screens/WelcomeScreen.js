import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config'
import SignUp from './SignUpScreen'
import firebase from 'firebase'

export default class WelcomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: false,
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: ''
        }
    }
    userLogin = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then((response) => {
                // return Alert.alert("successfully Login")
                this.props.navigation.navigate('HomeScreen')
            })
            .catch(function (error) {
                var errorCode = error.code
                var errorMessage = error.message
                return Alert.alert(errorMessage)
            })
    }
    render() {
        return (
            <View style={StyleSheet.container}>
                <View>
                    <Text style={styles.title}>Book Santa</Text>
                </View>
                <View>
                    <TextInput style={styles.loginBox} placeholder="abc@example.com"
                        keyboardType='email-address'
                        onChangeText={(text) => {
                            this.setState({
                                emailId: text
                            })
                        }}
                    />
                    <TextInput style={styles.loginBox} placeholder="Enter password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />
                    <TouchableOpacity style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
                        onPress={() => { this.userLogin(this.state.emailId, this.state.password) }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate('SignUp')
                        }}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#F8BE85' }, profileContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', }, title: { fontSize: 65, fontWeight: '300', paddingBottom: 30, color: '#ff3d00' }, loginBox: { width: 300, height: 40, borderBottomWidth: 1.5, borderColor: '#ff8a65', fontSize: 20, margin: 10, paddingLeft: 10 }, button: { width: 300, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: "#ff9800", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, },
//     buttonText: {
//         color: '#ffff', fontWeight: '200', fontSize: 20
//     },
//     buttonContainer: {
//         flex: 1, alignItems: 'center'
//     }
// })

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8BE85', alignItems: 'center', justifyContent: 'center' },
    profileContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    title: {
        fontSize: 65, fontWeight: '300', paddingBottom: 30, color: '#ff3d00'
    },
    loginBox: {
        width: 300, height: 40, borderBottomWidth: 1.5, borderColor: '#ff8a65', fontSize: 20, margin: 10, paddingLeft: 10
    },
    KeyboardAvoidingView: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    modalTitle: {
        justifyContent: 'center', alignSelf: 'center', fontSize: 30, color: '#ff5722', margin: 50
    },
    modalContainer: { flex: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffff", marginRight: 30, marginLeft: 30, marginTop: 80, marginBottom: 80, }, formTextInput: { width: "75%", height: 35, alignSelf: 'center', borderColor: '#ffab91', borderRadius: 10, borderWidth: 1, marginTop: 20, padding: 10 }, registerButton: { width: 200, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10, marginTop: 30 }, registerButtonText: { color: '#ff5722', fontSize: 15, fontWeight: 'bold' }, cancelButton: { width: 200, height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 5, },
    button: { width: 300, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: "#ff9800", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, padding: 10 }, buttonText: { color: '#ffff', fontWeight: '200', fontSize: 20 }
})
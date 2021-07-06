import React, { Component } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: ''
        }
    }
    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("Password and Confirm password does not match check the password")
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
                .then(() => {
                    db.collection('users').add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        contact_number: this.state.contact,
                        address: this.state.address
                    })
                    return Alert.alert("User added successfully", " ", [{
                        text: 'Ok', onPress: () =>
                            this.props.navigation.navigate('HomeScreen')

                    }])
                })
                .catch(function (error) {
                    var errorCode = error.code
                    var errorMessage = error.message
                    return Alert.alert(errorMessage)
                })
        }
    }
    render() {
        return (
            <View style={styles.modalContainer}>
                <ScrollView style={{ width: '100%' }}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                        <Text style={styles.modalTitle}>Registration</Text>
                        <TextInput style={styles.formTextInput} placeholder="First name"
                            maxLength={10}
                            onChangeText={(text) => {
                                this.setState({
                                    firstName: text
                                })
                            }}
                        />
                        <TextInput style={styles.formTextInput} placeholder="Last name"
                            maxLength={10}
                            onChangeText={(text) => {
                                this.setState({
                                    lastName: text
                                })
                            }}
                        />
                        <TextInput style={styles.formTextInput} placeholder="Address"
                            multiline={true}
                            onChangeText={(text) => {
                                this.setState({
                                    address: text
                                })
                            }}
                        />
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
                        <TextInput style={styles.loginBox} placeholder="Confirm password"
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    confirmPassword: text
                                })
                            }}
                        />
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.registerButton}
                                onPress={() => this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}>
                                <Text style={styles.registerButtonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.cancelButton}
                                onPress={() =>
                                    this.props.navigation.navigate('WelcomeScreen')
                                }>
                                <Text style={{ color: 'blue' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}
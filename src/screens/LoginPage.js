import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, AsyncStorage } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';

import { login } from '../publics/redux/actions/login';
import { getUser } from '../publics/redux/actions/user';

class LoginPage extends Component{
    constructor(){
        super();
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            showPassword: true,
            email: '',
            password: '',
            msgLogin: ''
        }
    }

    toggleSwitch(){
        this.setState({ showPassword: !this.state.showPassword });
    }

    async loadDataUser(tokenUser){
        await this.props.dispatch(getUser(tokenUser));
    }

    async getToken(){
        try{
            const tokenUser = await AsyncStorage.getItem('tokenUser');
            if(tokenUser !== null){
                this.loadDataUser(tokenUser);
            }else{
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async actLogin(){

        this.setState({
            msgLogin: ''
        })

        await this.props.dispatch(login({
            email: this.state.email,
            password: this.state.password
        }))
        .then((res) => {
            if(this.props.login.msgLogin){
                this.getToken();

                this.setState({
                    msgLogin: ''
                })
            
                this.refs.toast.show('Login Successfull');
                setTimeout(() => {
                    this.props.navigation.navigate('HomePage');
                }, 3000);
            }else{
                this.setState({
                    msgLogin: 'Login Failed'
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>JobsKanata</Text>
                    </View>
                </View>

                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                
                <View style={{ flex: 1, marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.msgLogin != "" ? 
                        <Text style={{ color: 'red', marginBottom: 10, fontSize: 18 }}>{this.state.msgLogin}</Text>
                    :   
                        null
                    }

                    <TextInput placeholder="Email.." style={{ borderWidth: 1, borderColor: '#f5f5f5', width: 330 }} value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
                    <TextInput secureTextEntry={this.state.showPassword} placeholder="Kata Sandi.." style={{ borderWidth: 1, borderColor: '#f5f5f5', width: 330, marginTop: 10}} value={this.state.password} onChangeText={(text) => this.setState({ password: text })}  />
                
                    <View style={{ flexDirection: 'row', marginTop: 10, marginRight: 190 }}>
                        <Switch 
                            onValueChange={this.toggleSwitch}
                            value={!this.state.showPassword}
                        />
                        <Text>Show Password</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 10, justifyContent: 'center', alignItems: 'center', width: 330 }} onPress={() => this.actLogin()}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="ios-lock" size={20} style={{ color: 'white' }} />
                                <Text style={{ color: 'white', marginLeft: 10, fontSize: 15 }}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Toast 
                    ref="toast"
                    style={{ backgroundColor: 'black' }}
                    position='bottom'
                    positionValue={90}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        login: state.login
    }
}

export default connect(mapStateToProps)(LoginPage);
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { BottomSheet } from 'react-native-btr';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';

import { register } from '../publics/redux/actions/register';

class RegisterPage extends Component{
    constructor(){
        super();
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            visible: false,
            showPassword: true,
            fullName: 'Nama Lengkap',
            personSelect: 'pilih',
            txtFullname: '',
            txtEmail: '',
            txtPassword: '',
            txtTelephone: '',
            txtAddress: ''
        }
    }

    toggleSwitch(){
        this.setState({ showPassword: !this.state.showPassword });
    }

    toggleBottomNavigation = () => {
        this.setState({ visible: !this.state.visible });
    }

    actSelectperson(selected){
        let selectedFix = '';
        selected == 'Pelamar' ?  selectedFix = 'Nama Lengkap' : selectedFix = 'Nama Perusahaan';

        this.setState({
            fullName: selectedFix,
            personSelect: selected
        })

        this.toggleBottomNavigation();
    }

    actRegister(){
        this.props.dispatch(register({
            username: this.state.txtFullname,
            status: this.state.personSelect,
            name: this.state.txtFullname,
            email: this.state.txtEmail,
            password: this.state.txtPassword,
            telephone: this.state.txtTelephone,
            address: this.state.txtAddress
        }))

        this.setState({
            personSelect: "pilih",
            txtFullname: "",
            txtEmail: "",
            txtPassword: "",
            txtTelephone: "",
            txtAddress: ""
        })
        
        this.refs.toast.show('Signup Successfully, please login');

        setTimeout(() => {
            this.props.navigation.navigate('LoginPage');
        }, 3000);

    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity 
                        style={{ backgroundColor: '#1C3F94', padding: 5 }} 
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>JobsKanata</Text>
                    </View>
                </View>

                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>      
                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView>
                        <View style={{ padding: 10}}>
                            <TouchableOpacity onPress={this.toggleBottomNavigation} style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#f5f5f5', padding: 10, width: '90%' }}>
                                <View>
                                    <Text>{this.state.personSelect}</Text>
                                </View>
                                <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 8, right: 8 }}>
                                    <Icon name="ios-arrow-dropdown" size={20} />
                                </View>
                            </TouchableOpacity>
                            <TextInput 
                                placeholder={this.state.fullName} 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: '90%', marginTop: 10 }} 
                                value={this.state.txtFullname} 
                                onChangeText={(text) => this.setState({ txtFullname: text })} 
                            />
                            <TextInput 
                                placeholder="Telephone..." 
                                keyboardType='numeric'
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: '90%', marginTop: 10 }} 
                                value={this.state.txtTelephone} 
                                onChangeText={(text) => this.setState({ txtTelephone: text })} 
                            />
                            <TextInput 
                                placeholder="Address..." 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: '90%', marginTop: 10 }} 
                                value={this.state.txtAddress} 
                                onChangeText={(text) => this.setState({ txtAddress: text })} 
                            />
                            <TextInput 
                                placeholder="Email.." 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: '90%', marginTop: 10 }} 
                                value={this.state.txtEmail} 
                                onChangeText={(text) => this.setState({ txtEmail: text })} 
                            />
                            <TextInput 
                                secureTextEntry={this.state.showPassword} 
                                placeholder="Password" 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: '90%', marginTop: 10}} 
                                value={this.state.txtPassword} onChangeText={(text) => this.setState({ txtPassword: text })} 
                            />

                            <View style={{ flexDirection: 'row', marginTop: 10, marginRight: 245 }}>
                                <Switch 
                                    onValueChange={this.toggleSwitch}
                                    value={!this.state.showPassword}
                                />
                                <Text>Show Password</Text>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 8, justifyContent: 'center', alignItems: 'center', width: 335, marginTop: 20 }} onPress={() => this.actRegister()}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="ios-person" size={20} style={{ color: 'white' }} />
                                    <Text style={{ color: 'white', marginLeft: 10, fontSize: 15 }}>Signup</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, marginTop: 5, width: '90%' }}>
                                <Text style={{ color: '#1C3F94' }}>By signing up, I have read and agreed to JobsKanata Terms of Use and Privacy Policy</Text>
                            </View>
                        </View>
                    </ScrollView> 
                </View>         

                <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this.toggleBottomNavigation}
                    onBackdropPress={this.toggleBottomNavigation}
                >
                    <View style={{ backgroundColor: 'white', height: 160, width: '100%', padding: 10 }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 18 }}>Select</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.actSelectperson('Pelamar')}>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Icon name="ios-person" size={25} />
                                <Text style={{ marginLeft: 10, fontSize: 16 }}>Pelamar</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.actSelectperson('Perusahaan')}>
                            <View style={{ flexDirection: 'row', borderTopColor: '#f5f5f5', borderTopWidth: 1, padding: 10 }}>
                                <Icon name="ios-person" size={25} />
                                <Text style={{ marginLeft: 10, fontSize: 16 }}>Perusahaan</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>

                <Toast 
                    ref="toast"
                    style={{ backgroundColor: 'black' }}
                    position='bottom'
                    positionValue={80}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />

            </View>
        )
    }
}

export default connect()(RegisterPage);
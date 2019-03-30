import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { BottomSheet } from 'react-native-btr';
import Toast from 'react-native-easy-toast';

import { updateUser } from '../publics/redux/actions/user';

class Contact extends Component{

    constructor(props){
        super(props);

        this.state = {
            visible: false,
            id: '',
            name: '',
            telephone: '',
            email: '',
            address: '',
            date_of_birth: '',
            gender: ''
        }
    }

    componentDidMount(){

        const { id, name, telephone, email, address, date_of_birth, gender } = this.props.user.data;

        this.setState({
            id: id,
            name: name,
            telephone: telephone,
            email: email,
            address: address,
            date_of_birth: date_of_birth,
            gender: gender
        });
    }

    toggleBottomNavigation = () => {
        this.setState({ visible: !this.state.visible });
    }

    actSelectGender(gender){
        this.setState({ gender: gender })
        this.toggleBottomNavigation();
    }

    async actSave(){
        await this.props.dispatch(updateUser(this.state.id, {
            name: this.state.name,
            telephone: `${this.state.telephone}`,
            email: this.state.email,
            address: this.state.address,
            date_of_birth: this.state.date_of_birth,
            gender: this.state.gender
        }))
        .then((res) => {
            this.refs.toast.show('Save Successfull');

            setTimeout(() => {
                this.props.navigation.navigate('ProfilePage');
            }, 3000);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.navigate('ProfilePage')}>
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>Contact Info</Text>
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <TextInput 
                            placeholder="Name" 
                            value={this.state.name} 
                            style={{ borderWidth: 1, borderColor: '#f5f5f5' }}
                            onChangeText={(text) => this.setState({ name: text })} 
                        />
                        {this.props.user.data.status == 'Pelamar' ? 
                            <TouchableOpacity onPress={this.toggleBottomNavigation}>
                                <View style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 8, padding: 10 }}>
                                    <Text>{this.state.gender}</Text>
                                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 8, right: 8 }}>
                                        <Icon name="ios-arrow-dropdown" size={25} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        : 
                            <View></View>
                        }
                        <TextInput 
                            placeholder="Telephone" 
                            keyboardType='numeric'
                            style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 8 }}
                            value={`${this.state.telephone}`}
                            onChangeText={(text) => this.setState({ telephone: text })} 
                        />
                        <TextInput 
                            placeholder="Email" 
                            style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 8 }}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })} 
                        />
                        <TextInput 
                            placeholder="Address" 
                            style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 8 }}
                            value={this.state.address}
                            onChangeText={(text) => this.setState({ address: text })} 
                        />
                        {this.props.user.data.status == 'Pelamar' ? 
                            <DatePicker 
                                style={{ width: 340, marginTop: 10 }}
                                date={this.state.date_of_birth}
                                modal="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1980-01-01"
                                maxDate="2020-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        borderColor: '#f5f5f5',
                                        borderWidth: 1
                                    }
                                }}
                                onDateChange={(date) => {this.setState({ date_of_birth: date })}}
                            />
                        :
                            <View></View>
                        }
                    </View>
                    <TouchableOpacity onPress={() => this.actSave()}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#1C3F94', marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ color: 'white' }}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this.toggleBottomNavigation}
                    onBackdropPress={this.toggleBottomNavigation}
                >
                    <View style={{ backgroundColor: 'white', height: 130, width: '100%', padding: 10 }}>
                        <TouchableOpacity onPress={() => this.actSelectGender('Male')}>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Icon name="ios-person" size={25} />
                                <Text style={{ marginLeft: 10, fontSize: 16 }}>Male</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.actSelectGender('Female')}>
                            <View style={{ flexDirection: 'row', borderTopColor: '#f5f5f5', borderTopWidth: 1, padding: 10 }}>
                                <Icon name="ios-person" size={25} />
                                <Text style={{ marginLeft: 10, fontSize: 16 }}>Female</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>

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
        user: state.user
    }
}

export default connect(mapStateToProps)(Contact);
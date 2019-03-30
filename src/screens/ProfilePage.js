import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { BottomSheet } from 'react-native-btr';
import Toast from 'react-native-easy-toast';


import { updateUser } from '../publics/redux/actions/user';

class ProfilePage extends Component{

    constructor(){
        super();

        this.state = {
            visibleSalary: false,
            visibleAddInfo: false,
            txtExpectedSalary: "",
            txtAdditionalInfo: "",
            idUser: "",
            name: '',
            telephone: '',
            email: '',
            address: '',
            date_of_birth: '',
            gender: ''
        }
    }

    componentDidMount(){
        const { id, name, telephone, email, address, date_of_birth, gender, expected_salary, additional_information } = this.props.user.data;

        this.setState({
            idUser: id,
            txtExpectedSalary: expected_salary,
            txtAdditionalInfo: additional_information,
            name: name,
            telephone: telephone,
            email: email,
            address: address,
            date_of_birth: date_of_birth,
            gender: gender
        })
    }

    toggleBottomNavigationViewSalary = () => {
        this.setState({ visibleSalary: !this.state.visibleSalary })
    }

    toggleBottomNavigationViewAddInfo = () => {
        this.setState({ visibleAddInfo: !this.state.visibleAddInfo })
    }

    async actSaveExSalary(){
        await this.props.dispatch(updateUser(this.state.idUser, {
            expected_salary: this.state.txtExpectedSalary,
            name: this.state.name,
            telephone: `${this.state.telephone}`,
            email: this.state.email,
            address: this.state.address,
            date_of_birth: this.state.date_of_birth,
            gender: this.state.gender,
            additional_information: this.state.txtAdditionalInfo
        }))
        .then(res => {
            this.refs.toast.show('Save Expected Salary Successfull');

            setTimeout(() => {
                this.toggleBottomNavigationViewSalary();
            }, 3000);
        })
        .catch(err => {
            console.log(err);
        })
    }

    async actSaveAddInfo(){
        await this.props.dispatch(updateUser(this.state.idUser, {
            expected_salary: this.state.txtExpectedSalary,
            name: this.state.name,
            telephone: `${this.state.telephone}`,
            email: this.state.email,
            address: this.state.address,
            date_of_birth: this.state.date_of_birth,
            gender: this.state.gender,
            additional_information: this.state.txtAdditionalInfo
        }))
        .then(res => {
            this.refs.toastadd.show('Save Additional Information Successfull');

            setTimeout(() => {
                this.toggleBottomNavigationViewAddInfo();
            }, 3000);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="ios-menu" size={30} style={{ color: 'white', marginTop: 5 }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>My Profile</Text>
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 10 }}>
                        <Image source={{ uri: 'https://www.pngarts.com/files/3/Avatar-PNG-Pic.png' }} style={{ width: 80, height: 80 }} />
                        <Text style={{ marginTop: 10, fontSize: 16, color: '#1C3F94' }}>{this.props.user.data.name}</Text>
                        <Text>{this.props.user.data.address}</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="ios-mail" size={25} style={{ color: '#1C3F94' }} />
                                <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Contact Info</Text>
                            </View>
                            <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 1, right: 5 }}>
                                <Icon name="ios-arrow-dropright" size={20} style={{ color: '#1C3F94' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                    {this.props.user.data.status == 'Pelamar' ?
                        <View> 
                            <View style={{ padding: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Experience')}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="ios-walk" size={25} style={{ color: '#1C3F94' }} />
                                        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Experience</Text>
                                    </View>
                                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 1, right: 5 }}>
                                        <Icon name="ios-arrow-dropright" size={20} style={{ color: '#1C3F94' }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                            <View style={{ padding: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Education')}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="ios-school" size={25} style={{ color: '#1C3F94' }} />
                                        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Education</Text>
                                    </View>
                                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 1, right: 5 }}>
                                        <Icon name="ios-arrow-dropright" size={20} style={{ color: '#1C3F94' }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                            <View style={{ padding: 10 }}>
                                <TouchableOpacity onPress={this.toggleBottomNavigationViewSalary}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="ios-cash" size={25} style={{ color: '#1C3F94' }} />
                                        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Expected Salary</Text>
                                    </View>
                                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 1, right: 5 }}>
                                        <Icon name="ios-arrow-dropright" size={20} style={{ color: '#1C3F94' }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                        </View>
                        :
                        <View></View>
                    }

                    <View style={{ padding: 10 }}>
                        <TouchableOpacity onPress={this.toggleBottomNavigationViewAddInfo}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="ios-clipboard" size={25} style={{ color: '#1C3F94' }} />
                                <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Additional Info</Text>
                            </View>
                            <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 1, right: 5 }}>
                                <Icon name="ios-arrow-dropright" size={20} style={{ color: '#1C3F94' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                </ScrollView>

                <BottomSheet
                    visible={this.state.visibleSalary}
                    onBackButtonPress={this.toggleBottomNavigationViewSalary}
                    onBackdropPress={this.toggleBottomNavigationViewSalary}
                >
                    <View style={{ backgroundColor: 'white', height: 200, width: '100%' }}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#f5f5f5', height: 50 }}>
                            <TouchableOpacity 
                                style={{ backgroundColor: '#1C3F94', padding: 10 }} 
                                onPress={() => this.toggleBottomNavigationViewSalary()}
                            >
                                <Icon name="ios-close" size={40} style={{ color: 'white', marginTop: 2 }} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>Expected Salary</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ padding: 10 }}>
                                <TextInput 
                                    placeholder="Expected Salary"
                                    value={this.state.txtExpectedSalary}
                                    onChangeText={(text) => this.setState({ txtExpectedSalary: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5' }}
                                />

                                <TouchableOpacity
                                    style={{ backgroundColor: '#1C3F94', padding: 5, marginTop: 20 }}
                                    onPress={() => this.actSaveExSalary()} 
                                >
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
                                </TouchableOpacity>                                
                            </View>
                        </ScrollView>
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
                </BottomSheet>

                <BottomSheet
                    visible={this.state.visibleAddInfo}
                    onBackButtonPress={this.toggleBottomNavigationViewAddInfo}
                    onBackdropPress={this.toggleBottomNavigationViewAddInfo}
                >
                    <View style={{ backgroundColor: 'white', height: 200, width: '100%' }}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#f5f5f5', height: 50 }}>
                            <TouchableOpacity 
                                style={{ backgroundColor: '#1C3F94', padding: 10 }} 
                                onPress={() => this.toggleBottomNavigationViewAddInfo()}
                            >
                                <Icon name="ios-close" size={40} style={{ color: 'white', marginTop: 2 }} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>Additional Information</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ padding: 10 }}>
                                <TextInput 
                                    placeholder="Additional Information"
                                    value={this.state.txtAdditionalInfo}
                                    onChangeText={(text) => this.setState({ txtAdditionalInfo: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5' }}
                                />

                                <TouchableOpacity
                                    style={{ backgroundColor: '#1C3F94', padding: 5, marginTop: 20 }}
                                    onPress={() => this.actSaveAddInfo()} 
                                >
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
                                </TouchableOpacity>                                
                            </View>
                        </ScrollView>
                    </View>

                    <Toast 
                        ref="toastadd"
                        style={{ backgroundColor: 'black' }}
                        position='bottom'
                        positionValue={90}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: 'white' }}
                    />
                </BottomSheet>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(ProfilePage);
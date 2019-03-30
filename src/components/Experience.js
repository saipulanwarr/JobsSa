import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-easy-toast';
import { BottomSheet } from 'react-native-btr';

import { getExperience, createExperience, updateExperience, deleteExperience } from '../publics/redux/actions/experience';

class Experience extends Component{

    constructor(){
        super();

        this.state = {
            visible: false,
            titleBottomSheet: '',
            txtPositionTitle: '',
            txtCompanyName: '',
            txtStartDuration: '',
            txtEndDuration: '',
            txtMonthlySalary: '',
            txtExperienceDescription: '',
            idExperience: ''
        }
    }

    componentDidMount(){
        this.loadDataExperience();
    }

    _keyExtractor = (item, index) => item.objectId;

    async loadDataExperience(){
        await this.props.dispatch(getExperience(this.props.user.data.id));
    }

    actExperience(act, item){
        this.toggleBottomNavigationView();
        this.setState({
            titleBottomSheet: act
        })

        if(act == 'Edit Experience'){
            this.setState({
                txtPositionTitle: item.position_title,
                txtCompanyName: item.company_name,
                txtMonthlySalary: item.monthly_salary,
                txtExperienceDescription: item.experience_description,
                idExperience: item.id
            })
        }
    }

    async actSave(){
        await this.props.dispatch(createExperience({
            position_title: this.state.txtPositionTitle,
            company_name: this.state.txtCompanyName,
            joined_duration: `${this.state.txtStartDuration} ${this.state.txtEndDuration}`,
            monthly_salary: this.state.txtMonthlySalary,
            experience_description: this.state.txtExperienceDescription,
            user_id: this.props.user.data.id
        }))
        .then(res => {
            this.refs.toastbottom.show('Save Successfull');

            setTimeout(() => {
                this.toggleBottomNavigationView();
            }, 3000)
        })
        .catch(err => {
            console.log(err);
        })
    }

    async actUpdate(){
        let idExperience = this.state.idExperience;

        await this.props.dispatch(updateExperience(idExperience, {
            position_title: this.state.txtPositionTitle,
            company_name: this.state.txtCompanyName,
            joined_duration: `${this.state.txtStartDuration} ${this.state.txtEndDuration}`,
            monthly_salary: this.state.txtMonthlySalary,
            experience_description: this.state.txtExperienceDescription,
        }))
        .then(res => {
            this.refs.toastbottom.show('Update Successfull');

            setTimeout(() => {
                this.toggleBottomNavigationView();
            }, 3000)
        })
        .catch(err => {
            console.log(err);
        })
    }

    async actDelete(){
        let idExperience = this.state.idExperience;

        await this.props.dispatch(deleteExperience({
            id: idExperience
        }))
        .then(res => {
            this.refs.toastbottom.show('Delete Successfully');
            setTimeout(() => {
                this.toggleBottomNavigationView();
            }, 3000);
        })
        .catch(err => {
            console.log(err);
        })
    }

    toggleBottomNavigationView = () => {
        this.setState({
            visible: !this.state.visible,
            titleBottomSheet: '',
            txtPositionTitle: '',
            txtCompanyName: '',
            txtJoinedDuration: '',
            txtMonthlySalary: '',
            txtExperienceDescription: '',
        })
    }

    renderItem = ({ item, index }) => {
        return(
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => this.actExperience('Edit Experience', item)}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.position_title}</Text>
                        <Text>{item.company_name}</Text>
                        <Text>{item.joined_duration}</Text>
                    </View>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 8, right: 5 }}> 
                        <Icon name="ios-arrow-dropright" size={28} style={{ color: '#1C3F94' }} />
                    </View>
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
            </View>
        )
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.navigate('ProfilePage')}>
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>Experience</Text>
                    </View>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 8, right: 8 }}>
                        <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 8 }} onPress={() => this.actExperience('Add Experience')}>
                            <Text style={{ color: 'white' }}>Add Experience</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                <FlatList
                    data={this.props.experience.data}
                    refreshing={this.props.experience.isLoading}
                    onRefresh={this.getExperience}
                    renderItem={this.renderItem} 
                />

                <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this.toggleBottomNavigationView}
                    onBackdropPress={this.toggleBottomNavigationView}
                >
                    <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#f5f5f5' }}>
                            <TouchableOpacity 
                                style={{ backgroundColor: '#1C3F94', padding: 5 }} 
                                onPress={() => this.toggleBottomNavigationView()}
                            >
                                <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>{this.state.titleBottomSheet}</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ padding: 10 }}>
                                <TextInput 
                                    placeholder="Position Title"
                                    value={this.state.txtPositionTitle}
                                    onChangeText={(text) => this.setState({ txtPositionTitle: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5' }}
                                />
                                <TextInput 
                                    placeholder="Company Name"
                                    value={this.state.txtCompanyName}
                                    onChangeText={(text) => this.setState({ txtCompanyName: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 10 }}
                                />
                                <Text style={{ marginTop: 8 }}>Joined Duration</Text>
                                <DatePicker 
                                    style={{ width: 340, marginTop: 10 }}
                                    date={this.state.txtStartDuration}
                                    modal="date"
                                    placeholder="select date"
                                    format="DD-MMMM-YYYY"
                                    minDate="01-January-1990"
                                    maxDate="01-January-2030"
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
                                    onDateChange={(date) => {this.setState({ txtStartDuration: date })}}
                                />
                                <Text>To: </Text>
                                <DatePicker 
                                    style={{ width: 340, marginTop: 10 }}
                                    date={this.state.txtEndDuration}
                                    modal="date"
                                    placeholder="select date"
                                    format="DD-MMMM-YYYY"
                                    minDate="01-January-1990"
                                    maxDate="01-January-2030"
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
                                    onDateChange={(date) => {this.setState({ txtEndDuration: date })}}
                                />
                                <TextInput 
                                    placeholder="Monthly Salary"
                                    value={this.state.txtMonthlySalary}
                                    onChangeText={(text) => this.setState({ txtMonthlySalary: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 8 }}
                                />
                                <TextInput 
                                    placeholder="Experience Description"
                                    value={this.state.txtExperienceDescription}
                                    onChangeText={(text) => this.setState({ txtExperienceDescription: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5' , marginTop: 8 }}
                                />
                                {this.state.titleBottomSheet == 'Add Experience' ? 
                                    <TouchableOpacity 
                                        style={{ backgroundColor: '#1C3F94', padding: 8, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => this.actSave()}
                                    >
                                        <Text style={{ color: 'white' }}>Save</Text>
                                    </TouchableOpacity>
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity 
                                            style={{ backgroundColor: '#dc3545', padding: 8, marginTop: 20, justifyContent: 'center', alignItems: 'center', width: 150 }}
                                            onPress={() => this.actDelete()}
                                        >
                                            <Text style={{ color: 'white' }}>Delete</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={{ backgroundColor: '#1C3F94', padding: 8, marginTop: 20, justifyContent: 'center', alignItems: 'center', width: 185 }}
                                            onPress={() => this.actUpdate()}
                                        >
                                            <Text style={{ color: 'white' }}>Update</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </ScrollView>
                        <Toast 
                            ref="toastbottom"
                            style={{ backgroundColor: 'black' }}
                            position='bottom'
                            positionValue={150}
                            fadeInDuration={750}
                            fadeOutDuration={1000}
                            opacity={0.8}
                            textStyle={{ color: 'white' }}
                        />
                    </View>
                </BottomSheet>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        experience: state.experience,
        user: state.user
    }
}

export default connect(mapStateToProps)(Experience);
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { BottomSheet } from 'react-native-btr';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';

import { getEducation, createEducation, updateEducation, deleteEducation } from '../publics/redux/actions/education';

class Education extends Component{

    constructor(){
        super();

        this.state = {
            visible: false,
            titleBottomSheet: '',
            name: '',
            graduation_date: '',
            qualification: '',
            field_of_study: '',
            major: '',
            grade_gpa: '',
            additional_info: ''
        }
    }

    componentDidMount(){
        this.loadDataEducation();
    }

    _keyExtractor = (item, index) => item.objectId;

    async loadDataEducation(){
        await this.props.dispatch(getEducation(this.props.user.data.id));
    }

    toggleBottomNavigationView = () => {
        this.setState({ 
            visible: !this.state.visible,
            name: '',
            graduation_date: '',
            qualification: '',
            field_of_study: '',
            major: '',
            grade_gpa: '',
            additional_info: '',
            idEducation: ''
        });
    }

    actEducation(act, item){
        this.toggleBottomNavigationView();

        this.setState({
            titleBottomSheet: act
        })

        if(act == 'Edit Education'){
            this.setState({
                idEducation: item.id,
                name: item.name,
                graduation_date: item.graduation_year,
                qualification: item.qualification,
                field_of_study: item.field_of_studies,
                major: item.major,
                grade_gpa: item.gpa,
                additional_info: item.additional_information
            })
        }
    }

    async actSave(){
        await this.props.dispatch(createEducation({
            name: this.state.name,
            qualification: this.state.qualification,
            field_of_studies: this.state.field_of_study,
            major: this.state.major,
            gpa: this.state.grade_gpa,
            graduation_year: this.state.graduation_date,
            additional_information: this.state.additional_info,
            user_id: this.props.user.data.id
        }))
        .then(res => {
            this.refs.toast.show('Save Successfull');
            setTimeout(() => {
                this.toggleBottomNavigationView();
            }, 3000)
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    async actUpdate(){
        let idEducation = this.state.idEducation;

        await this.props.dispatch(updateEducation(idEducation, {
            name: this.state.name,
            qualification: this.state.qualification,
            field_of_studies: this.state.field_of_study,
            major: this.state.major,
            gpa: this.state.grade_gpa,
            graduation_year: this.state.graduation_date,
            additional_information: this.state.additional_info,
        }))
        .then(res => {
            this.refs.toast.show('Update Successfull');
            setTimeout(() => {
                this.toggleBottomNavigationView();
            }, 3000);
        })
        .catch(err => {
            console.log(err);
        })
    }

    async actDelete(){
        let idEducation = this.state.idEducation;

        await this.props.dispatch(deleteEducation({
            id: idEducation
        }))
        .then(res => {
            this.refs.toast.show('Delete Successfull');
            setTimeout(() => {
                this.toggleBottomNavigationView();
            }, 3000);
        })
        .catch(err => {
            console.log(err);
        })
    }

    renderItem = ({item, index}) => {
        return(
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => this.actEducation('Edit Education', item)}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.name}</Text>
                        <Text>{item.qualification}</Text>
                        <Text>CGPA/Percentage - {item.gpa}</Text>
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
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity 
                        style={{ backgroundColor: '#1C3F94', padding: 5 }} 
                        onPress={() => this.props.navigation.navigate('ProfilePage')}
                    >
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>Education</Text>
                    </View>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 8, right: 8 }}>
                        <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 8 }} onPress={() => this.actEducation('Add Education')}>
                            <Text style={{ color: 'white' }}>Add Education</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                <FlatList 
                    data={this.props.education.data}
                    refreshing={this.props.education.isLoading}
                    onRefresh={this.getEducation}
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
                                    placeholder="Institute/University"
                                    value={this.state.name}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5' }}
                                />
                                <Text style={{ marginTop: 8 }}>Graduation Date</Text>
                                <DatePicker 
                                    style={{ width: 340, marginTop: 10 }}
                                    date={this.state.graduation_date}
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
                                    onDateChange={(date) => {this.setState({ graduation_date: date })}}
                                />
                                <TextInput 
                                    placeholder="Qualification"
                                    value={this.state.qualification}
                                    onChangeText={(text) => this.setState({ qualification: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 8 }}
                                />
                                <TextInput 
                                    placeholder="Field of Study"
                                    value={this.state.field_of_study}
                                    onChangeText={(text) => this.setState({ field_of_study: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5' , marginTop: 8 }}
                                />
                                <TextInput 
                                    placeholder="Major"
                                    value={this.state.major}
                                    onChangeText={(text) => this.setState({ major: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 8 }}
                                />
                                <TextInput 
                                    placeholder="Grade GPA/Percentage"
                                    value={this.state.grade_gpa}
                                    onChangeText={(text) => this.setState({ grade_gpa: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 8 }}
                                />
                                <TextInput 
                                    placeholder="Additional Information"
                                    value={this.state.additional_info}
                                    onChangeText={(text) => this.setState({ additional_info: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 8 }}
                                />
                                {this.state.titleBottomSheet == 'Add Education' ? 
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
                    </View>
                    <Toast 
                        ref="toast"
                        style={{ backgroundColor: 'black' }}
                        position='bottom'
                        positionValue={150}
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
        education: state.education,
        user: state.user
    }
}

export default connect(mapStateToProps)(Education);
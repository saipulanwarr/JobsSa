import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import DatePicker from 'react-native-datepicker';
import { BottomSheet } from 'react-native-btr';

import { getApplicant, updateApplicant } from '../publics/redux/actions/applicant';

class ApplicantPage extends Component{

    constructor(props){
        super(props);
        this.item = null;

        if(props.navigation.state.params && props.navigation.state.params.item){
            this.item = props.navigation.state.params.item;
        }

        this.state = {
            visible: false,
            date_of_interview: '',
            time_of_interview: '',
            idApplicant: ''
        }
    }

    componentDidMount(){
        this.loadDataApplicant();
    }

    async loadDataApplicant(){
        await this.props.dispatch(getApplicant());
    }

    getCountmyJobs = (arr, id) => {
        var count = 0;
        var filtered = arr.filter(function(d){
            count++;
            return d.job_id === id
        })

        return filtered.length;
    }

    refreshApplicant = () => {
        this.loadDataApplicant();
    }

    toggleBottomNavigationView = () => {
        this.setState({ visible: !this.state.visible, date_of_interview: '',
        time_of_interview: '', idApplicant: '' })
    }

    async actApp(id, status){
        await this.props.dispatch(updateApplicant(id, {
            status: status
        }))
        .then(res => {
            this.refs.toast.show(`${status} successfully`);            
        })
    }

    actInterview(id){
        this.toggleBottomNavigationView();
        this.setState({
            idApplicant: id
        })
    }

    async actSaveInterview(){
        await this.props.dispatch(updateApplicant(this.state.idApplicant, {
            status: "Interview Invitation",
            date_of_interview: this.state.date_of_interview
        }))
        .then(res => {
            this.toggleBottomNavigationView();
            this.refs.toast.show('Interview Invitation successfully');
        })
        .catch(err => {
            console.log(err);
        })
    }

    renderItem = ({item, index}) => {
        return(
            <View>
                {item.job_id == this.item.id ? 
                    <View>
                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 40, height: 60 }} source={{ uri: 'https://www.pngarts.com/files/3/Avatar-PNG-Pic.png' }} />
                                <View>
                                    <Text style={{ fontSize: 15, color: '#1C3F94', marginLeft: 5 }}>{item.user.name}</Text> 
                                    <Text style={{ fontSize: 15, color: '#1C3F94', marginLeft: 5 }}>{item.user.email}</Text>
                                    <View style={{ fontSize: 15, marginLeft: 5 }}>
                                        <Text style={{ color: '#1C3F94' }}>Status: {item.status}</Text>
                                    </View>
                                </View>                 
                            </View>
                            {item.status == "Interview Invitation" ? 
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ color: '#1C3F94' }}>Date Of Interview :{item.date_of_interview}</Text>
                                </View>
                            :
                                <View></View>
                            }   
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity style={{ backgroundColor: '#dc3545', padding: 5 }} onPress={() => this.actApp(item.id, 'Not Suitable')}>
                                    <Text style={{ color: 'white' }}>Not Suitable</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5, marginLeft: 5 }} onPress={() => this.actInterview(item.id)}>
                                    <Text style={{ color: 'white' }}>Interview Invitation</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5, marginLeft: 5 }} onPress={() => this.props.navigation.navigate('PersonUserPage', {id: item.user.id})}>
                                    <Text style={{ color: 'white' }}>View Details</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                    </View>
                :
                    <View></View>
                }
            </View>
        )
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 18, fontWeight: 'bold' }} numberOfLines={1}>Applicant</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#f5f5f5', padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#1C3F94' }}>{this.getCountmyJobs(this.props.applicant.data, this.item.id)} Applicant</Text>
                </View>
                

                <FlatList 
                    data={this.props.applicant.data}
                    refreshing={this.props.applicant.isLoading}
                    onRefresh={() => this.refreshApplicant()}
                    renderItem={this.renderItem}
                />

                <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this.toggleBottomNavigationView}
                    onBackdropPress={this.toggleBottomNavigationView}
                >
                    <View style={{ backgroundColor: 'white', height: 180, width: '100%' }}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#f5f5f5', height: 50 }}>
                            <TouchableOpacity 
                                style={{ backgroundColor: '#1C3F94', padding: 10 }} 
                                onPress={() => this.toggleBottomNavigationView()}
                            >
                                <Icon name="ios-close" size={40} style={{ color: 'white', marginTop: 2 }} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>Interview Invitation</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ padding: 10 }}>     
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ marginTop: 10, marginRight: 5, color: '#1C3F94' }}>Date of Interview</Text>
                                    <DatePicker
                                        style={{width: 200}}
                                        date={this.state.date_of_interview}
                                        mode="datetime"
                                        placeholder="select a date"
                                        format="DD-MMMM-YYYY HH:mm"
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
                                        iconSource={{ uri: 'https://img.icons8.com/color/260/google-calendar.png' }}
                                        onDateChange={(date) => {this.setState({date_of_interview: date});}}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={{ backgroundColor: '#1C3F94', padding: 5, marginTop: 20 }}
                                    onPress={() => this.actSaveInterview()} 
                                >
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
                                </TouchableOpacity>                                
                            </View>
                        </ScrollView>
                    </View>
                </BottomSheet>

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
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        applicant: state.applicant
    }
}

export default connect(mapStateToProps)(ApplicantPage);
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';

import { getApplicant, deleteApplicant } from '../publics/redux/actions/applicant';

class ActivePage extends Component{

    constructor(){
        super();
    }

    componentDidMount(){
        this.loadDataApplicant();
    }

    async loadDataApplicant(){
        await this.props.dispatch(getApplicant());
    }

    onRefreshApplicant = () => {
        this.loadDataApplicant();
    }

    getCountmyJobs = (arr, id) => {
        var count = 0;
        var filtered = arr.filter(function(d){
            count++;
            return d.user_id === id && d.status !== "Not Suitable"
        })

        return filtered.length;
    }


    actDelete = (id) => {
        Alert.alert(
            'Confirm Delete',
            `Are you sure want to delete this ?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    this.props.dispatch(deleteApplicant(id))
                    .then(res => {
                        this.refs.toast.show('Delete Successfully');
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }}
            ],
            {cancelable: false},
        );
    }

    renderItem = ({item, index}) => {
        return(
            <View>
                {item.status != "Not Suitable" && item.user_id == this.props.user.data.id ? 
                    <View>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.navigate('JobDetailPage', { item: item.job })}>
                            <Text style={{ color: '#1C3F94', fontSize: 17 }}>{item.job.title_job}</Text>
                            <Text style={{ fontSize: 15, marginTop: 2 }}>{item.job.user.name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                <Icon name="ios-cash" size={20} style={{ color: '#1C3F94' }} />
                                <Text style={{ marginLeft: 10 }}>IDR {item.job.salary}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 2, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="ios-timer" size={20} style={{ color: '#1C3F94' }} />
                                    <Text style={{ marginLeft: 10 }}>Date {item.created_at}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#1C3F94' }}>{item.status} | </Text>
                                    <TouchableOpacity onPress={() => this.actDelete(item.id)}>
                                        <Text style={{ color: 'red' }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 30, right: 15 }}>
                                <Icon name="ios-arrow-dropright" size={25} style={{ color: '#1C3F94' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                    </View>
                : 
                    <View></View> 
                }
            </View>
        )
    }

    render(){
        if(this.props.applicant.isLoading){
            return(
                <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return(
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="ios-menu" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>My Applicant</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#f5f5f5', padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#1C3F94' }}>{this.getCountmyJobs(this.props.applicant.data, this.props.user.data.id)} My Applicant Active</Text>
                </View>

                <FlatList 
                    data={this.props.applicant.data}
                    refreshing={this.props.applicant.isLoading}
                    onRefresh={() => this.onRefreshApplicant()}
                    renderItem={this.renderItem}
                />

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

export default connect(mapStateToProps)(ActivePage);
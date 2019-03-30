import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';

import { createApplicant, getApplicant, getUserApplicant } from '../publics/redux/actions/applicant';
import { createFavorite } from '../publics/redux/actions/favorite';

import StarOn from '../assets/images/staron.png';
import StarOff from '../assets/images/staroff.png';

class JobDetailPage extends Component{

    constructor(props){
        super(props);
        this.item = null;

        if(props.navigation.state.params && props.navigation.state.params.item){
            this.item = props.navigation.state.params.item;
        }

        this.state = {
            countApplicant: ''
        }
    }

    componentDidMount(){
        this.loadDataApplicant();
        this.loadCountUser();
    }

    async loadDataApplicant(){
        await this.props.dispatch(getApplicant());
    }

    async loadCountUser(){
        await this.props.dispatch(getUserApplicant(this.item.id));
    }

    async addApplicant(){
        await this.props.dispatch(createApplicant({
            user_id: this.props.user.data.id,
            job_id: this.item.id,
            status: 'Received'
        }))
        .then(res => {
            if(res.action.payload.data.message == "Data Found"){
                this.refs.toast.show('You have applied for this job');
            }else{
                this.refs.toast.show('You Successfully applied for this job');
                this.loadDataApplicant();
                this.loadCountUser();
            }
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    async addFavorite(){
        await this.props.dispatch(createFavorite({
            user_id: this.props.user.data.id,
            job_id: this.item.id
        }))
        .then(res => {
            this.refs.toast.show(this.props.favorite.message);
        })
        .catch(err => {
            console.log(err);
        })
    }

    filtered = (arr, jobid, userid) => {
        let image = <Image source={StarOff} style={{ width: 30, height: 30 }} />;
        arr.filter(function(d){
            if(d.job_id == jobid && d.user_id == userid){
                image = <Image source={StarOn} style={{ width: 30, height: 30 }} />
            }
        })
        
        return image;
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Text style={{ color: '#1C3F94', fontSize: 18, fontWeight: 'bold' }} numberOfLines={1}>{this.item.title_job}</Text>
                        </View>
                    </View>
                    {this.props.user.data.status == "Pelamar" ? 
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => this.addFavorite()}>
                            {this.filtered(this.props.favorite.data, this.item.id, this.props.user.data.id)}
                        </TouchableOpacity>
                    :
                        null
                    }
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                <ScrollView>
                    <View style={{ padding: 10, backgroundColor: '#f5f5f5' }}>
                        <Text style={{ fontSize: 16, color: '#1C3F94' }}>{this.item.user.name}</Text>
                        <View style={{ flexDirection: 'row',  marginTop: 5, width: 300  }}>
                            <Icon name="ios-pin" size={20} style={{ color: '#1C3F94' }} />
                            <Text style={{ marginLeft: 10 }}>{this.item.user.address}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Icon name="ios-cash" size={20} style={{ color: '#1C3F94' }} />
                            <Text style={{ marginLeft: 10 }}>IDR {this.item.salary}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Icon name="ios-briefcase" size={20} style={{ color: '#1C3F94' }} />
                            <Text style={{ marginLeft: 10 }}>{this.item.experience}</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Job Description</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>Responsibilities:</Text>
                        <Text style={{ marginTop: 10, marginLeft: 20, fontSize: 15, width: '90%' }}>{this.item.responsibilities}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>Requirements:</Text>
                        <Text style={{ marginTop: 10, marginLeft: 20, fontSize: 15, width: '90%' }}>{this.item.requirements}</Text>
                    </View>
                </ScrollView>
                {this.props.user.data.status == 'Pelamar' || this.item.user.id != this.props.user.data.id ? 
                    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 16 }}>{`Total ${this.props.applicant.userCount} Applicant`}</Text>
                    </View>
                :
                    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ApplicantPage', {item: this.item})}>
                            <Text style={{ color: '#1C3F94', fontSize: 16 }}>{`Total ${this.props.applicant.userCount} Applicant`}</Text>
                        </TouchableOpacity>
                    </View>
                }
    
                {this.props.user.data.status == 'Pelamar' ? 
                    <TouchableOpacity 
                        style={{ backgroundColor: '#1C3F94', padding: 8, justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginTop: 10, marginRight: 20, marginBottom: 10 }}
                        onPress={() => this.addApplicant()}
                    >
                        <Text style={{ color: 'white' }}>Apply</Text>
                    </TouchableOpacity>
                    :
                    <View></View>
                }

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
        applicant: state.applicant,
        favorite: state.favorite
    }
}

export default connect(mapStateToProps)(JobDetailPage);
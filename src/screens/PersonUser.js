import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { getPersonUser } from '../publics/redux/actions/user';

class PersonUser extends Component{

    constructor(props){
        super(props);

        this.id = null;

        if(props.navigation.state.params && props.navigation.state.params.id){
            this.id = props.navigation.state.params.id
        }
    }

    componentDidMount(){
        this.loadDetailUser();
    }

    async loadDetailUser(){
        await this.props.dispatch(getPersonUser(this.id));
    }

    render(){
        if(this.props.user.isLoading){
            return(
                <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 18, fontWeight: 'bold' }} numberOfLines={1}>{this.props.user.personUser.username}</Text>
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={{ uri: 'https://www.pngarts.com/files/3/Avatar-PNG-Pic.png' }} style={{ width: 100, height: 100 }} />
                            <Text style={{ color: '#1C3F94', fontSize: 18 }}>{this.props.user.personUser.username}</Text>    
                        </View>
                        <Text style={{ fontSize: 16, marginTop: 5, paddingRight: 10, paddingLeft: 10, paddingBottom: 10 }}>{this.props.user.personUser.additional_information}</Text>
                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                            <Icon name="ios-mail" size={25} style={{ color: '#1C3F94' }} />
                            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#1C3F94' }}>Contact Info</Text>
                        </View>
                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                        <View style={{ padding: 5 }}>
                            <Text style={{ marginBottom: 5 }}>email: {this.props.user.personUser.email}</Text>
                            <Text style={{ marginBottom: 5 }}>telephone: {this.props.user.personUser.telephone}</Text>
                            <Text style={{ marginBottom: 5 }}>address: {this.props.user.personUser.address}</Text>
                            <Text style={{ marginBottom: 5 }}>date of birth: {this.props.user.personUser.date_of_birth}</Text>
                            <Text style={{ marginBottom: 5 }}>gender: {this.props.user.personUser.gender}</Text>
                        </View>


                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                            <Icon name="ios-walk" size={25} style={{ color: '#1C3F94' }} />
                            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#1C3F94' }}>Experience</Text>
                        </View>
                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                        {this.props.user.personUser != "" ? 
                            this.props.user.personUser.experience.map((exp) => (
                                <View key={exp.id} style={{ padding: 5 }}>
                                    <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>{exp.company_name}</Text>
                                    <Text style={{ marginBottom: 5 }}>{exp.position_title}</Text>
                                    <Text style={{ marginBottom: 5 }}>{exp.joined_duration}</Text>
                                    <Text style={{ marginBottom: 5 }}>{exp.experience_description}</Text>
                                </View>
                            ))
                        :
                            null
                        }
                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                            <Icon name="ios-school" size={25} style={{ color: '#1C3F94' }} />
                            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#1C3F94' }}>Education</Text>
                        </View>
                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                        {this.props.user.personUser != "" ? 
                            this.props.user.personUser.education.map((edu) => (
                                <View key={edu.id} style={{ padding: 5 }}>
                                    <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>{edu.name}</Text>
                                    <Text style={{ marginBottom: 5 }}>{edu.qualification}</Text>
                                    <Text style={{ marginBottom: 5 }}>{edu.field_of_studies}</Text>
                                    <Text style={{ marginBottom: 5 }}>{edu.major}</Text>
                                    <Text style={{ marginBottom: 5 }}>{edu.graduation_year}</Text>
                                </View>
                            ))
                        :
                            null
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(PersonUser);
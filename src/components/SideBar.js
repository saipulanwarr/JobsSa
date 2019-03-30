import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

class SideBar extends Component{

    constructor(){
        super();
    }

    async actLogout(){
        try{
            await AsyncStorage.removeItem('tokenUser');
        }
        catch(error){
            console.log(error.message);
        }

        this.props.navigation.navigate('LandingPage');
    }

    getCountmyJobs = (arr, id) => {
        var count = 0;
        var filtered = arr.filter(function(d){
            count++;
            return d.user_id === id
        })

        return filtered.length;
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Image source={{ uri: 'https://www.pngarts.com/files/3/Avatar-PNG-Pic.png' }} style={{ width: 60, height: 60 }} />
                    <View style={{ marginTop: 10, width: 150, marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, color: '#1C3F94' }}>{this.props.user.data.username}</Text>
                        {this.props.user.data.status == 'Perusahaan' ? <Text>Company</Text> : <Text>Web Programmer</Text>}
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HomePage')}>
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="ios-home" size={25} style={{ color: '#1C3F94' }} />
                            <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>Kanata Jobs</Text>
                        </View>
                        <View>
                            <Text style={{ backgroundColor: '#1C3F94', color: 'white', borderRadius: 10, padding: 5 }}>{this.props.job.data.total}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchPage')}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Icon name="ios-search" size={25} style={{ color: '#1C3F94' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>Search Jobs</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                {this.props.user.data.status == 'Pelamar' ? 
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FavoritePage')}>
                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="ios-star" size={25} style={{ color: '#1C3F94' }} />
                                <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>Favorite Jobs</Text>
                            </View>
                            <View>
                                <Text style={{ backgroundColor: '#1C3F94', color: 'white', borderRadius: 10, padding: 5 }}>{this.props.favorite.dataLength}</Text>
                            </View>
                        </View>
                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                    </TouchableOpacity>
                :
                    null
                }

                {this.props.user.data.status == 'Pelamar' ? 
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyApplicationPage')}>
                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="ios-paper" size={25} style={{ color: '#1C3F94' }} />
                                <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>My Applicant</Text>
                            </View>
                            <View>
                                <Text style={{ backgroundColor: '#1C3F94', color: 'white', borderRadius: 10, padding: 5 }}>{this.props.job.data != "" ? this.getCountmyJobs(this.props.applicant.data, this.props.user.data.id) : null}</Text>                            
                            </View>
                        </View>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyJobsPage')}>
                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="ios-paper" size={25} style={{ color: '#1C3F94' }} />
                                <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>My Jobs</Text>
                            </View>
                            <View>
                                <Text style={{ backgroundColor: '#1C3F94', color: 'white', borderRadius: 10, padding: 5 }}>{this.props.job.data != "" ? this.getCountmyJobs(this.props.job.data.data, this.props.user.data.id) : null}</Text>                            
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePage')}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Icon name="ios-person" size={25} style={{ color: '#1C3F94' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>My Profile</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                <TouchableOpacity onPress={() => this.actLogout()}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Icon name="ios-exit" size={25} style={{ color: '#1C3F94' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        job: state.job,
        applicant: state.applicant,
        favorite: state.favorite
    }
}

export default connect(mapStateToProps)(SideBar);
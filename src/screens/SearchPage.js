import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import { searchJob } from '../publics/redux/actions/job';

class SearchPage extends Component{

    constructor(){
        super();

        this.state = {
            search: ""
        }
    }

    async actSearch(){
        await this.props.dispatch(searchJob(this.state.search))
        .then(res => {
            this.props.navigation.navigate('HomePage');
        })
        .catch(err => console.log(err));
    }

    render(){
        if(this.props.job.isLoading){
            return(
                <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>Search Page</Text>
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput 
                        placeholder="Search Here" 
                        style={{ borderWidth: 1, borderColor: '#f5f5f5', width: '100%', marginTop: 10}} 
                        value={this.state.search} 
                        onChangeText={(text) => this.setState({ search: text })} 
                    />

                     <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 8, justifyContent: 'center', alignItems: 'center', width: 335, marginTop: 20 }} onPress={() => this.actSearch()}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="ios-search" size={20} style={{ color: 'white' }} />
                            <Text style={{ color: 'white', marginLeft: 10, fontSize: 15 }}>Search</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        job: state.job
    }
}

export default connect(mapStateToProps)(SearchPage);
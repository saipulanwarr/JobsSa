import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { getJob } from '../publics/redux/actions/job';
import moment from 'moment';

class MyJobsPage extends Component{

    constructor(){
        super();
    }

    componentDidMount(){
        this.loadDataJob();
    }

    async loadDataJob(){
        await this.props.dispatch(getJob());
    }

    onRefreshJobs = () => {
        this.loadDataJob();
    }

    getCountmyJobs = (arr, id) => {
        var count = 0;
        var filtered = arr.filter(function(d){
            count++;
            return d.user_id === id
        })

        return filtered.length;
    }

    renderItem = ({item, index}) => {
        return(
            <View>
                {item.user.id == this.props.user.data.id ? 
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('JobDetailPage', { item: item })}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#1C3F94', fontSize: 17 }}>{item.title_job}</Text>
                            <Text style={{ fontSize: 15, marginTop: 2 }}>{item.user.name}</Text>
                            <View style={{ flexDirection: 'row',  marginTop: 2, width: 300  }}>
                                <Icon name="ios-pin" size={20} style={{ color: '#1C3F94' }} />
                                <Text style={{ marginLeft: 10 }}>{item.user.address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 2, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="ios-cash" size={20} style={{ color: '#1C3F94' }} />
                                    <Text style={{ marginLeft: 10 }}>IDR {item.salary}</Text>
                                </View>
                                <Text style={{ color: '#1C3F94' }}>{moment(item.created_at, "YYYY-MM-DD H:i:s").fromNow()}</Text>
                            </View>
                            <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 30, right: 15 }}>
                                <Icon name="ios-arrow-dropright" size={30} style={{ color: '#1C3F94' }} />
                            </View>
                        </View>
                        <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                    </TouchableOpacity>
                :
                    <View></View>
                }
            </View>
        )
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
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="ios-menu" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>My Jobs</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#f5f5f5', padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#1C3F94' }}>{this.getCountmyJobs(this.props.job.data.data, this.props.user.data.id)} My Jobs</Text>
                </View>

                <FlatList 
                    data={this.props.job.data.data}
                    refreshing={this.props.job.isLoading}
                    onRefresh={() => this.onRefreshJobs()}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        job: state.job
    }
}

export default connect(mapStateToProps)(MyJobsPage);
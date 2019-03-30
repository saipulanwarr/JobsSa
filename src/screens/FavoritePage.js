import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import moment from 'moment';


import { getFavorite } from '../publics/redux/actions/favorite';

class FavoritePage extends Component{

    async loadDataFavorite(){
        await this.props.dispatch(getFavorite(this.props.user.data.id));
    }

    onRefreshFavorite = () => {
        this.loadDataFavorite();
    }

    renderItem = ({item, index}) => {
        return(
            <View>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.navigate('JobDetailPage', { item: item.job })}>
                    <Text style={{ color: '#1C3F94', fontSize: 17 }}>{item.job.title_job}</Text>
                    <Text style={{ fontSize: 15, marginTop: 2 }}>{item.job.user.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Icon name="ios-cash" size={20} style={{ color: '#1C3F94' }} />
                        <Text style={{ marginLeft: 10 }}>IDR {item.job.salary}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="ios-timer" size={20} style={{ color: '#1C3F94' }} />
                            <Text style={{ marginLeft: 10 }}>Date {item.created_at}</Text>
                        </View>
                        <Text style={{ color: '#1C3F94' }}>{moment(item.created_at, "YYYY-MM-DD H:i:s").fromNow()}</Text>
                    </View>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 30, right: 15 }}>
                        <Icon name="ios-arrow-dropright" size={25} style={{ color: '#1C3F94' }} />
                    </View>
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
            </View>
        )
    }
    render(){
        if(this.props.favorite.isLoading){
            return(
                <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 5 }} onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="ios-menu" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>My Favorite Jobs</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#f5f5f5', padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#1C3F94' }}>{this.props.favorite.dataLength} My Favorite Jobs</Text>
                </View>

                <FlatList 
                    data={this.props.favorite.data}
                    refreshing={this.props.favorite.isLoading}
                    onRefresh={() => this.onRefreshFavorite()}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        favorite: state.favorite
    }
}

export default connect(mapStateToProps)(FavoritePage);
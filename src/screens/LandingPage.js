import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import MapView, {Marker} from 'react-native-maps';

class LandingPage extends Component{

    constructor(){
        super();

        this.state = {
            region: {
                latitude: -6.595038,
                longitude: 106.816635,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            error: null
        }
    }

    async componentWillMount(){
        await navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                },
                error: null
            });

            console.log(position.coords);
        },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
        );
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
               <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Text style={{ color: '#1C3F94', fontSize: 25, fontWeight: 'bold' }}>JobsKanata</Text>
                </View>

                <View style={{ flex: 9 }}>
                    <ScrollView>
                        <View style={{ width: '100%', height: 400 }}>
                            <MapView
                                style={{ flex: 1, width: '100%', height: '100%' }}
                                initialRegion={this.state.region}
                                showsUserLocation={true}
                            >
                                <MapView.Marker
                                    coordinate={{
                                        latitude: this.state.region.latitude,
                                        longitude: this.state.region.longitude
                                    }}
                                    title="Location Here"
                                >
                                    <Image source={{ uri: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' }} style={{ width: 40, height: 40 }} />
                                </MapView.Marker>
                            </MapView>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Text style={{ fontSize: 16, color: '#1c3f94' }}>Finding the right job just got easier!</Text>
                        </View>
                        <View style={{ backgroundColor: '#f5f5f5', padding: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                
                                <TouchableOpacity style={{ backgroundColor: '#1c3f94', padding: 10, marginRight: 5, width: '50%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('RegisterPage')}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="ios-person" size={20} style={{ color: 'white' }} />
                                        <Text style={{ color: 'white', marginLeft: 10 }}>Signup</Text>
                                    </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={{ backgroundColor: '#1c3f94', padding: 10, marginLeft: 5, width: '50%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('LoginPage')}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="ios-lock" size={20} style={{ color: 'white' }} />
                                        <Text style={{ color: 'white', marginLeft: 10 }}>Login</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ marginLeft: 17, marginRight: 15, marginTop: 10, marginBottom: 10, color: '#1c3f94' }}>By signing up, I have read and agreed to JobsKanata Tearms of Use and Privacy Policy</Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default LandingPage;
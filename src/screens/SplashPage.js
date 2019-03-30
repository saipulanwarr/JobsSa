import React, { Component } from 'react';
import { Container, View, Icon, Text, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import { connect } from 'react-redux';

import { getUser } from '../publics/redux/actions/user';

class SplashPage extends Component{

    componentDidMount(){
        setTimeout(() => {
            this.getToken();
        }, 5000);
    }

    async loadDataUser(token){
        await this.props.dispatch(getUser(token));
    }

    async getToken(){
        try{
            const tokenUser = await AsyncStorage.getItem('tokenUser');
            if(tokenUser !== null){
                await this.loadDataUser(tokenUser);
                this.props.navigation.navigate('HomePage');
            }else{
                this.props.navigation.navigate('LandingPage');
            }
        }
        catch(error){
            console.log(error);
        }
    }

    render(){
        console.disableYellowBox = true;
        return(
            <Container style={style.styleContainer}>
                <View style={style.styleView}>
                    <Text style={style.styleText}>JobsKanata</Text>
                </View>
            </Container>
        )
    }
}

const style = {
    styleContainer: {
        backgroundColor: '#fdfdfd'
    },
    styleView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleText: {
        fontSize: 30,
        color: '#1C3F94',
        fontWeight: 'bold'
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(SplashPage);
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import Constants from '../constants';
import SubmitButton from '../components/common/FormSubmitButton';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {};
export default class Login extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
    }
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const titleConfig = {
      title: 'LOG IN',
      tintColor:Constants.Colors.White
    };
    return (
      <View style={{flex:1}}>
        <NavigationBar
          title={titleConfig}
          style={{backgroundColor: 'rgb(32,73,157)'}}
          statusBar={{hidden:false,tintColor:'rgb(32,73,157)'}}
          leftButton={<TouchableOpacity style={{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100*2.5,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*.8}} onPress={()=>goBack()}><Icon color={Constants.Colors.White} name='chevron-circle-left' size={30} /></TouchableOpacity>} />
        <ImageBackground source={Constants.Images.user.bgImg}  style={styles.container}>
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.flexDirRowStyle}>
              <Image source={Constants.Images.user.logo} style={styles.logoStyle} resizeMode={'contain'}/>
              <Image source={Constants.Images.user.mamby} style={styles.logo2Style} resizeMode={'contain'}/>
            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.icon}>
                <Icon color={Constants.Colors.White} name={'envelope'} size={20} />
              </View>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder={'EMAIL'}
                placeholderTextColor={Constants.Colors.White}
                onChnageText={({email})=>this.setState({email})}
                keyboardType={'email-address'}
                style={styles.textInput} />
            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.icon}>
                <Icon color={Constants.Colors.White} name={'lock'} size={20} />
              </View>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder={'PASSWORD'}
                placeholderTextColor={Constants.Colors.White}
                onChnageText={({password})=>this.setState({password})}
                secureTextEntry={true}
                style={styles.textInput} />
            </View>
            <SubmitButton text={'LOG IN'} textStyle={styles.buttonText} buttonStyle={styles.button} />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer:{
    flexDirection:'row',
    marginVertical: Constants.BaseStyle.DEVICE_HEIGHT/100*1.5,
    // height: Constants.BaseStyle.DEVICE_HEIGHT/100*7.5,
    // width: Constants.BaseStyle.DEVICE_WIDTH/100*80,
    //borderWidth:1
    marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 5,
  },
  flexDirRowStyle:{
    flexDirection: "row",
    alignItems: 'center'
  },
  logoStyle:{
    width: Constants.BaseStyle.DEVICE_WIDTH/100*25,
    height: Constants.BaseStyle.DEVICE_HEIGHT/100*25,
    // alignSelf: 'center'
  },
  logo2Style:{
    width: Constants.BaseStyle.DEVICE_WIDTH/100*20,
    height: Constants.BaseStyle.DEVICE_HEIGHT/100*20,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH/100*5,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100*3,
    // alignSelf: 'center'
  },
  textInput: {
    //fontSize: 20,
    textAlign:'center',
    marginLeft: Constants.BaseStyle.DEVICE_HEIGHT/100*1.2,
    height: Constants.BaseStyle.DEVICE_HEIGHT/100*7,
    flex:.85,
    borderWidth:1,
    borderColor:Constants.Colors.White,
    color:Constants.Colors.White
  },
  icon:{
    flex:.15,
    borderWidth:1,
    alignItems:'center',
    borderColor:Constants.Colors.White,
    justifyContent:'center',
  },
  buttonText:{
    //fontFamily:'Belizio Black'
  },
  button:{
    // borderWidth:2,
    // borderColor:Constants.Colors.White,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 *5,
    borderRadius:0,
    backgroundColor:'transparent',
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 *2,
    width:Constants.BaseStyle.DEVICE_WIDTH/100 * 30,
    alignSelf:'center',
    backgroundColor:'rgb(52,151,66)'
  }
});

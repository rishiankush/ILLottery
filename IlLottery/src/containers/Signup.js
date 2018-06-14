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
  ImageBackground,
  Image,
  ScrollView
} from 'react-native';
import Constants from '../constants';
import SubmitButton from '../components/common/FormSubmitButton';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../redux/modules/user';
import RestClient from '../utilities/RestClient';
import Regex from '../utilities/Regex';
import { ToastActionsCreators } from 'react-native-redux-toast';
import _ from 'lodash';

type Props = {};
class Signup extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      fullName:'',
      nextLotteryTime:new Date()
    }
    // console.log('props ******* next_lottery_time constructor ******** ',props)
  }

  signup(){
    let { dispatch } = this.props.navigation;
    let { email, password, fullName } = this.state;
    // if(_.isEmpty(fullName.trim())) {
    //   dispatch(ToastActionsCreators.displayInfo('Please enter your name'));
    //   return;
    // }
    if(_.isEmpty(email.trim())) {
      dispatch(ToastActionsCreators.displayInfo('Please enter your email'));
      return;
    }
    if(!Regex.validateEmail(email.trim())) {
      dispatch(ToastActionsCreators.displayInfo('Please enter a valid email address'));
      return;
    }
    if(_.isEmpty(password)) {
      dispatch(ToastActionsCreators.displayInfo(enterPassword));
      return;
    }
    this.props.UserActions.signup({...this.state});

  }

  componentDidMount(){
    // console.log('props ******* next_lottery_time did mount ******** ',this.props)
    setInterval( () => { 
    //console.log('props ******* next_lottery_time did mount ******** ')

       RestClient.get("events/v1/next_lottery_time").then((result) => {
          console.log('result ******* ',result)
          this.setState({nextLotteryTime:result.success})
        }).catch(error => {
          console.log("error=> " ,error)
        });
    }, 1000);
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const titleConfig = {
      title: 'SIGN UP',
      tintColor:Constants.Colors.White
    };
    // console.log('props ******* next_lottery_time render ******** ',this.props)
    let getLotteryDay = new Date(this.state.nextLotteryTime).getDate(),
        getLotteryHour =  new Date(this.state.nextLotteryTime).getHours(),
        getLotteryMinutes = new Date(this.state.nextLotteryTime).getMinutes(),
        getLotterySeconds = new Date(this.state.nextLotteryTime).getSeconds();
    return (
      <View style={{flex:1}}>
        <NavigationBar
          title={titleConfig}
          style={{backgroundColor: 'rgb(32,73,157)'}}
          statusBar={{hidden:false,tintColor:'rgb(32,73,157)'}}
          leftButton={<TouchableOpacity style={{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100*2.5,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*.8}} onPress={()=>goBack()}><Icon color={Constants.Colors.White} name='chevron-circle-left' size={30} /></TouchableOpacity>} />
          <ImageBackground source={Constants.Images.user.bgImg}  style={styles.container}>
            <ScrollView>
              <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={{fontSize:20,textAlign:'center',marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*10,color:Constants.Colors.White,fontWeight:'700'}}>WIN A FAST PASS FOR YOU AND A FRIEND</Text>
                <View style={styles.flexDirRowStyle}>
                  <Image source={Constants.Images.user.logo} style={styles.logoStyle} resizeMode={'contain'}/>
                  <Image source={Constants.Images.user.mamby} style={styles.logo2Style} resizeMode={'contain'}/>
                </View>
                <Text style={{fontWeight:'600',fontSize:16,color:Constants.Colors.White}}>OUR NEXT DRAWING !</Text>
                <View style={{borderWidth:1, width:Constants.BaseStyle.DEVICE_WIDTH/100*70,alignSelf:'center',borderColor:'rgba(255,255,255,.6)'}} />
                
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*4,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*5,height:Constants.BaseStyle.DEVICE_HEIGHT/100*8,width:Constants.BaseStyle.DEVICE_WIDTH/100*14,borderWidth:2,borderColor:Constants.Colors.White,transform:[{rotate: '45deg'}],alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontWeight:'700',fontSize:22,color:Constants.Colors.White,transform:[{rotate:'-45deg'}]}}>{getLotteryDay}</Text>
                    </View>
                    <Text style={{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT/100*2,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,textAlign:'center',fontWeight:'600',fontSize:16,color:Constants.Colors.White}}>DAYS</Text>
                  </View>
                  <View style={{flex:1}}>
                    <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*4,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*5,height:Constants.BaseStyle.DEVICE_HEIGHT/100*8,width:Constants.BaseStyle.DEVICE_WIDTH/100*14,borderWidth:2,borderColor:Constants.Colors.White,transform:[{rotate: '45deg'}],alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontWeight:'700',fontSize:22,color:Constants.Colors.White,transform:[{rotate:'-45deg'}]}}>{getLotteryHour}</Text>
                    </View>
                    <Text style={{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT/100*2,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,textAlign:'center',fontWeight:'600',fontSize:16,color:Constants.Colors.White}}>HR</Text>
                  </View>
                  <View style={{flex:1}}>
                    <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*4,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*5,height:Constants.BaseStyle.DEVICE_HEIGHT/100*8,width:Constants.BaseStyle.DEVICE_WIDTH/100*14,borderWidth:2,borderColor:Constants.Colors.White,transform:[{rotate: '45deg'}],alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontWeight:'700',fontSize:22,color:Constants.Colors.White,transform:[{rotate:'-45deg'}]}}>{getLotteryMinutes}</Text>
                    </View>
                    <Text style={{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT/100*2,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,textAlign:'center',fontWeight:'600',fontSize:16,color:Constants.Colors.White}}>MIN</Text>
                  </View>
                  <View style={{flex:1}}>
                    <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*4,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*5,height:Constants.BaseStyle.DEVICE_HEIGHT/100*8,width:Constants.BaseStyle.DEVICE_WIDTH/100*14,borderWidth:2,borderColor:Constants.Colors.White,transform:[{rotate: '45deg'}],alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontWeight:'700',fontSize:22,color:Constants.Colors.White,transform:[{rotate:'-45deg'}]}}>{getLotterySeconds}</Text>
                    </View>
                    <Text style={{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT/100*2,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,textAlign:'center',fontWeight:'600',fontSize:16,color:Constants.Colors.White}}>SEC</Text>
                  </View>
                </View>

                <View style={styles.textInputContainer}>
                  <View style={styles.icon}>
                    <Icon color={Constants.Colors.White} name={'user'} size={20} />
                  </View>
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'FULL NAME'}
                    placeholderTextColor={Constants.Colors.White}
                    onChnageText={(fullName)=>this.setState({fullName})}
                    style={styles.textInput} />
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
                    onChnageText={(email)=>this.setState({email})}
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
                    onChnageText={(password)=>this.setState({password})}
                    secureTextEntry={true}
                    style={styles.textInput} />
                </View>
                <SubmitButton _Press={()=>navigate('Login')} text={'LOG IN'} textStyle={styles.buttonText} buttonStyle={styles.button} />
                <SubmitButton _Press={()=>this.signup()} text={'SIGN UP'} textStyle={styles.buttonText} buttonStyle={[styles.button,{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT/100*2}]} />
              </KeyboardAvoidingView>
            </ScrollView>
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
  textInputContainer:{
    flexDirection:'row',
    marginVertical: Constants.BaseStyle.DEVICE_HEIGHT/100*1.5,
    // height: Constants.BaseStyle.DEVICE_HEIGHT/100*7.5,
    // width: Constants.BaseStyle.DEVICE_WIDTH/100*80,
    //borderWidth:1
    marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 5,
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

const mapStateToProps = state => ({
  next_lottery_time : state.next_lottery_time
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Signup);

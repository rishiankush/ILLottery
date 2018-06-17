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
  Picker,
  ImageBackground,
  Image
} from 'react-native';
import Constants from '../../constants';
import RestClient from '../../utilities/RestClient';

type Props = {};
export default class TimerComponent extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      nextLotteryTime:new Date()
    }
  }

  componentWillMount(){
    
  }

  componentDidMount(){
    // console.log('props ******* next_lottery_time did mount ******** ',this.props)
    setInterval( () => { 
    //console.log('props ******* next_lottery_time did mount ******** ')

       RestClient.get("events/next_lottery_time").then((result) => {
         console.log('result ******* ',result)
          this.setState({nextLotteryTime:result.success})
        }).catch(error => {
          console.log("error=> " ,error)
        });
    }, 1000);
  }

  render() {
    let getLotteryDay = new Date(this.state.nextLotteryTime).getDate(),
        getLotteryHour =  new Date(this.state.nextLotteryTime).getHours(),
        getLotteryMinutes = new Date(this.state.nextLotteryTime).getMinutes(),
        getLotterySeconds = new Date(this.state.nextLotteryTime).getSeconds();
    return (
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
    );
  }
}

const styles = StyleSheet.create({
  
});

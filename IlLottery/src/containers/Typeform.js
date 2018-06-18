/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  WebView,
  Linking
} from 'react-native';
import Constants from '../constants';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../redux/modules/user';

type Props = {};
class Typeform extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      isLoading: true
    }
    // console.log('props ******* next_lottery_time constructor ******** ',props)
  }

  onNavigationStateChange = eve => {
    if (eve.loading !== this.state.isLoading) {
      this.setState({
        isLoading: eve.loading
      });
    }
    console.log('event ******* ',eve)
    // if (eve.url.indexOf("api/orders/") > -1) {
    //   this.props.navigation.replace("paymentStatus", {
    //     url: eve.url,
    //     id: this.props.navigation.state.params.id
    //   });
    // }
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const titleConfig = {
      title: 'SURVEY',
      tintColor:Constants.Colors.White
    };
    const uri = 'https://threadest1.typeform.com/to/vjS2Nx';
    return (
      <View style={{flex:1}}>
        <NavigationBar
          title={titleConfig}
          style={{backgroundColor: 'rgb(32,73,157)'}}
          statusBar={{hidden:false,tintColor:'rgb(32,73,157)'}}
          leftButton={<TouchableOpacity style={{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100*2.5,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*.8}} onPress={()=>goBack()}><Icon color={Constants.Colors.White} name='chevron-circle-left' size={30} /></TouchableOpacity>} />
        <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri }}
        onNavigationStateChange={this.onNavigationStateChange}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Typeform);

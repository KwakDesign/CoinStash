/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';

import MarqueeLabelVertical from 'react-native-lahk-marquee-label-vertical';
import MarqueeLabel from 'react-native-lahk-marquee-label';
import { Header } from 'react-native-elements';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
// var MarqueeLabel = require('@remobile/react-native-marquee-label');

export default class ltc extends Component {
  constructor() {
    super();
    console.log("hi")
    this.state = {
      bitcoinPrice: "",
      bitcoinYdayPrice: "",
      ethereumPrice: "",
      ethereumYdayPrice: "",
      liteCoinPrice: "",
      liteCoinYdayPrice: ""
    };
  }

  getCurrentPrice = () => {
    // console.log("hi")
    fetch('https://api.lionshare.capital/api/prices')
    .then(function(response) {
      // debugger
      return response.json()
    }).then((obj) => {
      console.log(this)
      console.log(obj)
      console.log(obj.data.BTC.length)
      console.log(obj.data.ETH.length)
      console.log(obj.data.LTC.length)
      this.setState({bitcoinPrice: obj.data.BTC[obj.data.BTC.length - 1],
                    ethereumPrice: obj.data.ETH[obj.data.ETH.length - 1],
                    liteCoinPrice: obj.data.LTC[obj.data.LTC.length - 1]})

                  })
  }
  componentDidMount() {
    this.getCurrentPrice()
    setInterval(this.getCurrentPrice, 100000);

    // Yesterday's Bitcoin Price
    // fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    // .then(function(response) {
    //   return response.json()
    // }).then((obj) => {
    //   console.log(JSON.parse(obj))
    //   this.setState({bitcoinYdayPrice: obj.data})
    // });


  }

  // componentWillUnmount() {
  //   clearInterval()
  // }

  static navigationOptions = {
    title: 'LiteCoin',
  };

  render() {
    // debugger
    const { bitcoinPrice } = this.state
    return (
      <View style={styles.container}>
        <View style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'flex-start',
          }}>
          <Text style={{
              fontSize: 60,
              fontWeight: 'bold',
              justifyContent: 'center'
            }}>LTC</Text>
          </View>
          <Text style={{
              fontSize: 30
            }}>{`$${this.state.liteCoinPrice}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  marqeeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  marqueeLabel: {
    marginBottom: 100,
    backgroundColor: 'blue',
    width:400,
    height:50,
    // fontSize:12,
    // fontWeight:'800',
    // color:'white',
  },
  header: {
    backgroundColor: 'blue'
  }
});


AppRegistry.registerComponent('ltc', () => ltc);

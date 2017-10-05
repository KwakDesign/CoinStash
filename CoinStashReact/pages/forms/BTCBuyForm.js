/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
'use strict';
import React, { Component } from 'react';
import {
  Button,
  FormLabel,
  FormInput
} from 'react-native-elements'
import SelectInput from 'react-native-select-input-ios';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Picker
} from 'react-native';

export default class BTCBuyForm extends Component {
  constructor() {
    super();
    this.state = {
      session: {
        amount: '00.00',
        btcInput: '00.00'
      }
    }
  }

  handleInputChange(name, val) {
    const session = this.state.session;
    session[name] = val;
    this.setState({session: session})
  }
  onChangeAmount = this.handleInputChange.bind(this, "amount")

  handlePress() {
    const { session } = this.state
    let responseJson = fetch ("https://rocky-atoll-80901.herokuapp.com/coinbases/buyBTC", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: session.amount
      })
    })
    .then(function(response) {return response.json()} )
    .catch(error => console.error("fetch error: ", error))

    let sendParams = responseJson
  }

  handleUserSubmit = this.handlePress.bind(this)

  getPickerOptionsPaymentMethod() {
    return [
      { value: 0, label: 'USD Wallet' },
    ];
  }

  getPickerOptionsDepositTo() {
    return [
      { value: 0, label: 'BTC Wallet' }
    ];
  }

  onSubmitPaymentMethod(value) {
    this.setState({
      paymentMethod: value
    });
  }

  onSubmitDepositTo(value) {
    this.setState({
      depositTo: value
    });
  }

  componentDidMount() {
  }

  render() {
    let state = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.formTitle}></Text>

        <View style={styles.inputContainer}>
          <Text style={styles.labelTitle}>Payment Method:</Text>
          <SelectInput
            value={state.valueLarge}
            options={this.getPickerOptionsPaymentMethod()}
            onCancelEditing={() => console.log('onCancel')}
            onSubmitEditing={this.onSubmitPaymentMethod.bind(this)}
            style={[styles.paymentMethod, styles.selectInputLarge]}
          />
        </View>

        <View style={styles.twoColumnLayout}>

          <View style={styles.flexDirectionColumn, styles.firstPaymentColumn}>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencyPriceLabel}>USD</Text>
              <TextInput
                placeholder="0.00"
                keyboardType={'numeric'}
                style={styles.paymentInteger}
                onChangeText={this.onChangeAmount}
                value={this.state.amount}
              />
            </View>
          </View>

          <View style={styles.flexDirectionColumn, styles.secondPaymentColumn}>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencyPriceLabel}>
                BTC
              </Text>
              <TextInput
                placeholder="0.00000000"
                keyboardType={'numeric'}
                style={styles.paymentInteger}
                onChangeText={(btcInput) => this.setState({btcInput})}
                value={this.state.btcInput}
              />
            </View>
          </View>

        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelTitle}>Deposit to:</Text>
          <SelectInput
            value={state.valueLarge}
            options={this.getPickerOptionsDepositTo()}
            onCancelEditing={() => console.log('onCancel')}
            onSubmitEditing={this.onSubmitDepositTo.bind(this)}
            style={[styles.paymentMethod, styles.selectInputLarge]}
          />
        </View>
        <Button
          buttonStyle={{backgroundColor: '#185A9D', borderRadius: 2, marginTop: 10, width: 300}}
          onPress={this.handleUserSubmit}
          textStyle={{textAlign: 'center'}}
          title={`BUY`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
    backgroundColor: '#eee',
    alignItems: 'center',
    flex: 1
  },
  labelTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: -15
  },
  inputContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 40,
    borderBottomColor: 'rgba(24, 90, 157, .5)',
    borderBottomWidth: 1,
    width: 290
  },
  paymentMethod: {
    marginTop: 35,
    paddingBottom: 10,
  },
  formTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  twoColumnLayout: {
    flexDirection: 'row',
  },
  paymentInteger: {
    height: 30,
    backgroundColor: 'transparent',
    width: 145,
    textAlign: 'right',
    paddingRight: 10
  },
  firstPaymentColumn: {
    borderStyle: 'solid',
    borderRightWidth: 1.5,
    borderRightColor: 'rgba(24, 90, 157, .5)',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(24, 90, 157, .5)',
    height: 60,
    marginLeft: -50
  },
  currencyPriceLabel: {
    marginLeft: 5,
    marginTop: 5
  },
  secondPaymentColumn: {
    borderStyle: 'solid',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(24, 90, 157, .5)',
    height: 60,
    marginRight: -50
  },
  depositWallet: {
    alignItems: 'flex-start',
    marginLeft: 40,
    borderBottomColor: 'rgba(24, 90, 157, .5)',
    borderBottomWidth: 1,
  }
});

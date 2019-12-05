/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { Container, Content, Text, View, Picker, Grid, Col, Left, Right, Button, Icon, List, ListItem, Body, Radio, Input, Item } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


// Our custom files and classes import
import Colors from '../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class AddBankAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            session_id: '',
            regions: [],
            account_number: '',
            bank_name: '',
            account_name: '',
            country: '',
            countrylist: '',


        };
    }

    componentWillMount() {
        this.setState({ id: this.props.id });
        AsyncStorage.getItem('user_id').then((value) => {
            this.setState({ 'user_id': value.toString() })
        })
        AsyncStorage.getItem('session_id').then((value) => {
            this.setState({ 'session_id': value.toString() })
        })
        AsyncStorage.getItem('aut').then((value) => {
            this.setState({ 'aut': value.toString() })
        })

    }

    componentDidMount() {
        this.setState({
            regions: regions_list,
        })
    }

    addBankAccount() {
           const { user_id, account_number, bank_name, account_name, country } = this.state
          this.setState({ loading: true })
          const formData = new FormData();
          formData.append('feature', "pack");
          formData.append('action', "addbank");
          formData.append('id', user_id,);
          formData.append('accnum', account_number);
          formData.append('bankname', bank_name);
          formData.append('nameonacc', account_name);
          formData.append('bankcountry', country);

          fetch('https://www.ita-obe.com/mobile/v1/package.php', {
              method: 'POST', headers: {
                  Accept: 'application/json',
              }, body: formData,
          })
              .then(res => res.json())
              .then(res => {
                  console.warn(res);
                  if (!res.error) {
                      this.setState({
                          loading: false,
                          cartItems: res.data
                      })
                      Alert.alert(
                        'Success',
                        'Bank account added successfully',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                          {text: 'OK', onPress: () => Actions.reg()},
                        ],
                        { cancelable: false }
                      )
  
                  } else {
                      Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
                      this.setState({ loading: false })
                  }
              }).catch((error) => {
                  console.warn(error);
                  alert(error.message);
              });
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                    <Text>Processing</Text>
                </View>
            );
        }


        var left = (
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => Actions.pop()}>
                    <Icon name="ios-close" size={38} style={{ fontSize: 38 }} />
                </Button>
            </Left>
        );
        var right = (
            <Right style={{ flex: 1 }}>
                <Button onPress={() => Actions.search()} transparent>
                </Button>
            </Right>
        );
        return (
            <Container style={{ backgroundColor: '#fdfdfd' }}>
                <Navbar left={left} right={right} title="New Address" />
                <Content padder>
                    <View>
                        <Text style={{ marginTop: 15, fontSize: 20 }}>Add Bank Account</Text>
                        <Text style={{ marginTop: 15, fontSize: 12 }}>Bank Account Number</Text>
                        <Item regular style={{ marginTop: 7 }}>
                            <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                            <Input placeholder='Bank Account Number' keyboardType='number-pad' onChangeText={(text) => this.setState({ account_number: text })} placeholderTextColor="#687373" />
                        </Item>
                        <Text style={{ marginTop: 15, fontSize: 12 }}>Bank Name</Text>
                        <Item regular style={{ marginTop: 7 }}>
                            <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                            <Input placeholder='Bank Name' onChangeText={(text) => this.setState({ bank_name: text })} placeholderTextColor="#687373" />
                        </Item>
                        <Text style={{ marginTop: 15, fontSize: 12 }}> Name on Bank Account</Text>
                        <Item regular style={{ marginTop: 7 }}>
                            <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                            <Input placeholder='Name on Bank Account' onChangeText={(text) => this.setState({ account_name: text })}  placeholderTextColor="#687373" />
                        </Item>
                        <Text style={{ marginTop: 15, fontSize: 12 }}> Bank Country</Text>
                        <Item regular style={{ marginTop: 7 }}>
                            <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                            <Picker
                                mode="dropdown"
                                placeholder="Select a Contry"
                                note={true}
                                selectedValue={this.state.countrylist}
                                onValueChange={(size) => this.setState({ countrylist: size, country: size.id })}
                            >
                                <Picker.Item label="Select a Contry" value="key0" />
                                {this.renderCountry()}
                            </Picker>
                        </Item>

                    </View>
                    <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
                        <Button onPress={() => this.addBankAccount()} style={{ backgroundColor: Colors.bg_color }} block iconLeft>
                            <Text style={{ color: '#fdfdfd' }}>Add Account</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }

    renderItems() {
        let items = [];
        this.state.cartItems.map((item, i) => {
            items.push(
                <ListItem
                    key={i}
                    style={{ marginLeft: 0 }}
                >
                    <Body style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 18 }}>
                            {item.quantity > 1 ? item.quantity + "x " : null}
                            {item.title}
                        </Text>
                        <Text style={{ fontSize: 14, fontStyle: 'italic' }}>Color: {item.color}</Text>
                        <Text style={{ fontSize: 14, fontStyle: 'italic' }}>Size: {item.size}</Text>
                    </Body>
                    <Right>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{item.price}</Text>
                    </Right>
                </ListItem>
            );
        });
        return items;
    }

    checkout() {
        console.log(this.state);
        alert("Check the log");
    }

    renderCountry() {

        let serviceItems = this.state.regions.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s.name} />
        });
        return serviceItems;
    }

    renderState() {

        let serviceItems = this.state.states.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s.name} />
        });
        return serviceItems;
    }

    renderAddType() {
        let serviceItems = this.state.addType.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s.name} />
        });
        return serviceItems;
    }

    renderType() {
        let serviceItems = this.state.type.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s.name} />
        });
        return serviceItems;
    }

}

const regions_list =
    [
        { id: 0, name: 'Select Country' },
        { id: 11, name: 'Nigeria' },
        { id: 12, name: 'United Kindom' },
        { id: 13, name: 'United States' }
    ]
    ;

const styles = {
    invoice: {
        paddingLeft: 20,
        paddingRight: 20
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#bdc3c7'
    }
};




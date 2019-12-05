/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Icon, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'

// Our custom files and classes import
import Colors from '../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            regions: [],
            banks: [],
            aut: '',
            user_id: '',
            session_id: '',
            title: '',
            pack: 1,
            banklist:'',

            entity: 'i',

            place: '',
            address: '',
            position: '',
            salary: '',

            today: "",

            fromdate: "2019-05-29",
            company_name: '',
            rc: '',
            bank:'',
            company_last_name: '',
            company_first_name: '',
            gender: 'male',
            company_dob:'',
        };
    }

    componentWillMount() {
        this.setState({ pack: this.props.pack, title: this.props.title });

        this.setState({ id: this.props.id });
        AsyncStorage.getItem('user_id').then((value) => {
            this.setState({ 'user_id': value.toString() })
            this.getBankAccount();
        })
       
    }

    componentDidMount() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        this.setState({
            today: year + '-' + month + '-' + date, regions: regions_list,
        });
    }

    getBankAccount() {

        const { user_id } = this.state
        this.setState({ loading: true })
        const formData = new FormData();
        formData.append('feature', "pack");
        formData.append('action', "getBanks");
        formData.append('id', user_id);

        console.warn(formData);
        fetch('https://www.ita-obe.com/mobile/v1/package.php', {
            method: 'POST', headers: {
                Accept: 'application/json',
            }, body: formData,
        })
            .then(res => res.json())
            .then(res => {
                if (!res.error) {
                    this.setState({
                        loading: false,
                        banks: res.data
                    })
                } else {
                    Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
                    this.setState({ loading: false })
                }
            }).catch((error) => {
                console.warn(error);
                alert(error.message);
            });
    }

    addIndividual() {

        const { user_id, pack, bank,  entity, Officeaddress, PlaceOfWork,monthlySalary } = this.state
        var p2p =0;
        var bt =0;
        var CFF =0;
            if(pack == 1){
               p2p = 1
            }else if(pack == 2){
                bt = 1
            }else if(pack == 3){
                CFF = 1
            }else{
                Alert.alert('Validation failed', 'Try Again', [{text: 'Okay'}])
            }

        this.setState({ loading: true })
        const formData = new FormData();
        formData.append('feature', "user");
        formData.append('action', "addAddress");
        formData.append('id', user_id);

        formData.append('p2p', p2p);
        formData.append('bt', bt);
        formData.append('CFF', CFF);

        formData.append('bankID', bank);
        formData.append('iorc', entity);

        formData.append('coyname', '');
        formData.append('coyreg', '');
        formData.append('coycontactsname','');
        formData.append('coycontactfname', '');
        formData.append('coycontactdob', '');
        formData.append('coycontactgender',"");

     
        formData.append('Officeaddress', Officeaddress);
        formData.append('PlaceOfWork', PlaceOfWork);
        formData.append('monthlySalary', monthlySalary);

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
                    })

                } else {
                    Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
                    this.setState({ loading: false })
                }
            }).catch((error) => {
                console.warn(error);
                alert(error.message);
            });

    }

    addCompany() {

        const { user_id, pack, bank, company_name,rc, entity, company_last_name, company_first_name,company_dob, gender } = this.state
        var p2p =0;
        var bt =0;
        var CFF =0;
            if(pack == 1){
               p2p = 1
            }else if(pack == 2){
                bt = 1
            }else if(pack == 3){
                CFF = 1
            }else{
                Alert.alert('Validation failed', 'Try Again', [{text: 'Okay'}])
            }

        this.setState({ loading: true })
        const formData = new FormData();
        formData.append('feature', "user");
        formData.append('action', "addAddress");
        formData.append('id', user_id);

        formData.append('p2p', p2p);
        formData.append('bt', bt);
        formData.append('CFF', CFF);

        formData.append('bankID', bank);
        formData.append('iorc', entity);

        formData.append('coyname', company_name);
        formData.append('coyreg', rc);
        formData.append('coycontactsname', company_last_name);
        formData.append('coycontactfname', company_first_name);
        formData.append('coycontactdob', company_dob);
        formData.append('coycontactgender', gender);

     
        formData.append('Officeaddress', '');
        formData.append('PlaceOfWork', '');
        formData.append('monthlySalary', '');

      
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
                    })

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
        const { entity } = this.state
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
                <Button onPress={() => Actions.pop()} transparent>
                    <Icon name='ios-arrow-back' />
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
                <Navbar left={left} right={right} title={this.state.title} />
                <Content padder>
                    <View>

                        <Text style={{ marginTop: 15, fontSize: 18 }}> Are you a (an)</Text>
                        <RadioButton.Group
                            onValueChange={value => this.setState({ entity: value })}
                            value={this.state.entity}
                        >
                            <View style={{ justifyContent: 'center' }}>

                                <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                                    <View
                                        style={{
                                            borderRadius: 15,
                                            width: 30,
                                            height: 30,
                                            backgroundColor: '#ffe6e6',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 7,
                                            marginRight: 5,

                                        }}
                                    >
                                        <RadioButton value="i" />
                                    </View>
                                    <Text style={{ fontSize: 15 }}>Individual</Text>
                                    <Icon name='ios-person' />
                                </Item>

                            </View>

                            <View style={{ justifyContent: 'center' }}>

                                <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                                    <View
                                        style={{
                                            borderRadius: 15,
                                            width: 30,
                                            height: 30,
                                            backgroundColor: '#ffe6e6',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 7,
                                            marginRight: 5,

                                        }}
                                    >
                                        <RadioButton value="c" />
                                    </View>
                                    <Text style={{ fontSize: 15 }}>Company</Text>
                                    <Icon name='ios-person' />
                                </Item>

                            </View>
                        </RadioButton.Group>
                        <Text style={{ marginTop: 15, fontSize: 12 }}> Bank Account</Text>
                        <Item regular style={{ marginTop: 7 }}>
                            <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                            <Picker
                                mode="dropdown"
                                placeholder="Select a Contry"
                                note={true}
                                selectedValue={this.state.banklist}
                                onValueChange={(size) => this.setState({ bank: size.BankId, banklist:size })}
                            >
                                <Picker.Item label="Select a Bank" value="key0" />
                                {this.renderBank()}
                            </Picker>
                            <TouchableOpacity onPress={() => Actions.bank()}>
                                <Icon name='ios-add' />
                            </TouchableOpacity>
                        </Item>

                        {entity == 'i' ?


                            <View>
                                <View>
                                    <Text style={{ marginTop: 15, fontSize: 20 }}>Details</Text>
                                    <Text style={{ marginTop: 15, fontSize: 12 }}>Where do you work:</Text>
                                    <Item regular style={{ marginTop: 7 }}>
                                        <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                                        <Input placeholder='Place of work' onChangeText={(text) => this.setState({ place: text })} placeholderTextColor="#687373" />
                                    </Item>
                                    <Text style={{ marginTop: 15, fontSize: 12 }}>Office Address:</Text>
                                    <Item regular style={{ marginTop: 7 }}>
                                        <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                                        <Input placeholder='Office Address' onChangeText={(text) => this.setState({ address: text })} placeholderTextColor="#687373" />
                                    </Item>
                                    <Text style={{ marginTop: 15, fontSize: 12 }}> Monthly Salary:</Text>
                                    <Item regular style={{ marginTop: 7 }}>
                                        <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                                        <Input placeholder='Monthly Salary' keyboardType='number-pad' onChangeText={(text) => this.setState({ salary: text })} placeholderTextColor="#687373" />
                                    </Item>
                                </View>
                                <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
                                    <Button onPress={() => this.addIndividual()} style={{ backgroundColor: Colors.bg_color }} block iconLeft>
                                        <Text style={{ color: '#fdfdfd' }}>Submit</Text>
                                    </Button>
                                </View>

                            </View>
                            :
                            <View>
                                <View>
                                    <Text style={{ marginTop: 15, fontSize: 20 }}>Company Details</Text>
                                    <Text style={{ marginTop: 15, fontSize: 12 }}>Company Name:</Text>
                                    <Item regular style={{ marginTop: 7 }}>
                                        <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                                        <Input placeholder='Company Name' onChangeText={(text) => this.setState({ company_name: text })} placeholderTextColor="#687373" />
                                    </Item>
                                    <Text style={{ marginTop: 15, fontSize: 12 }}>Company Registration Number:</Text>
                                    <Item regular style={{ marginTop: 7 }}>
                                        <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                                        <Input placeholder='Company Registration Number' onChangeText={(text) => this.setState({ rc: text })} placeholderTextColor="#687373" />
                                    </Item>
                                    <Text style={{ marginTop: 15, fontSize: 12 }}> Company Contact Surname:</Text>
                                    <Item regular style={{ marginTop: 7 }}>
                                        <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                                        <Input placeholder='Company Contact Surname' onChangeText={(text) => this.setState({ company_last_name: text })} placeholderTextColor="#687373" />
                                    </Item>
                                    <Text style={{ marginTop: 15, fontSize: 12 }}> Company Contact First Name</Text>
                                    <Item regular style={{ marginTop: 7 }}>
                                        <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                                        <Input placeholder='Company Contact First Name' onChangeText={(text) => this.setState({ company_first_name: text })} placeholderTextColor="#687373" />
                                    </Item>



                                    <Text style={{ marginTop: 15, fontSize: 12 }}> Company Contact Date of Birth</Text>
                                    <Item regular style={{ marginTop: 7 }}>
                                        <Text style={{ paddingLeft: 5, marginLeft: 0 }}>*</Text>
                                        <DatePicker
                                            style={{ width: 300 }}
                                            date={this.state.company_dob}
                                            mode="date"
                                            placeholder="select date"
                                            format="YYYY-MM-DD"
                                            minDate="2019-05-01"
                                            maxDate={this.state.today}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateInput: {
                                                    marginLeft: 36
                                                }
                                            }}
                                            onDateChange={(date) => { this.setState({ fromdate: date }) }}
                                        />


                                    </Item>
                                    <Text style={{ marginTop: 15, fontSize: 12 }}>Gender</Text>

                                    <RadioButton.Group
                                        onValueChange={value => this.setState({ gender: value })}
                                        value={this.state.entity}
                                    >
                                        <View style={{ justifyContent: 'center' }}>

                                            <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                                                <View
                                                    style={{
                                                        borderRadius: 15,
                                                        width: 30,
                                                        height: 30,
                                                        backgroundColor: '#ffe6e6',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginLeft: 7,
                                                        marginRight: 5,

                                                    }}
                                                >
                                                    <RadioButton value="male" />
                                                </View>
                                                <Text style={{ fontSize: 15 }}>Male</Text>
                                                <Icon name='ios-person' />
                                            </Item>

                                        </View>

                                        <View style={{ justifyContent: 'center' }}>

                                            <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                                                <View
                                                    style={{
                                                        borderRadius: 15,
                                                        width: 30,
                                                        height: 30,
                                                        backgroundColor: '#ffe6e6',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginLeft: 7,
                                                        marginRight: 5,

                                                    }}
                                                >
                                                    <RadioButton value="female" />
                                                </View>
                                                <Text style={{ fontSize: 15 }}>Female</Text>
                                                <Icon name='ios-person' />
                                            </Item>

                                        </View>
                                    </RadioButton.Group>



                                </View>
                                <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
                                    <Button onPress={() => this.addCompany()} style={{ backgroundColor: Colors.bg_color }} block iconLeft>
                                        <Text style={{ color: '#fdfdfd' }}>Submit</Text>
                                    </Button>
                                </View>

                            </View>
                        }




                    </View>
                </Content>
            </Container>
        );
    }

    checkout() {
        const { paymethod, toadd, shipreq, billadd, shippadd, shipmed } = this.state
        const shippingmethod =
            { paymethod: paymethod, toadd: toadd, shipreq: shipreq, billadd: billadd, shippadd: shippadd, shipmed: shipmed }
        Actions.payment({ paymentDetails: shippingmethod });

    }


    renderAddress() {
        let serviceItems = this.state.product.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s.addressLine1} />
        });
        return serviceItems;
    }

    renderBank() {
        let serviceItems = this.state.banks.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s.BankName} />
        });
        return serviceItems;
    }

    renderCountry() {

        let serviceItems = this.state.regions.map((s, i) => {
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
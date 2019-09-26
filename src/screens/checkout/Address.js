/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { Container, Content, Text,View, Picker, Grid, Col, Left, Right, Button, Icon, List, ListItem, Body, Radio, Input, Item } from 'native-base';
import FAIcon  from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


// Our custom files and classes import
import Colors from '../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class Address extends Component {
  constructor(props) {
      super(props);
      this.state = {
        states: [],
        regions: [],
        addType: [],
        type: [],
        addressone: '',
        addresstwo: '',
        addressthree: '',
        addressdesc: '',
       
        city: '',
        state: 0,
        country: 0,
        postcode: '',
        addtype: 0,
        type: 0,

        delyes: true,
        delno: false,
        deval: true,

        colyes: true,
        colno: false,
        coval: true,
       
        loading: false,
        aut: '',
        user_id: '',
        session_id: '',
        countrylist:'',
        statelist: '',
        addtypelist: '',
        typelist: '',

      };
  }

  componentWillMount() 
  {
      this.setState({id: this.props.id });
      AsyncStorage.getItem('user_id').then((value) => {
        this.setState({ 'user_id': value.toString()})    
      })
      AsyncStorage.getItem('session_id').then((value) => {
      this.setState({ 'session_id': value.toString()})
      })
      AsyncStorage.getItem('aut').then((value) => {
        this.setState({ 'aut': value.toString()})
        })
        
  }

  componentDidMount() {
    this.setState({ 
        states: state_list, regions: regions_list, addType: addresstype_list, type: type_list
      })
  }

  addAddress()
    {
        const {user_id,addressone, addresstwo, addressthree, addressdesc,city, state, country, postcode, addtype, type, coval, deval} = this.state
                if(coval){  var deladd = 'Y'; }else{  var deladd = 'N'; }
                if(deval){  var colladd = 'Y'; }else{  var colladd = 'N'; }
                if(addressone == "" || city == "" || state == 0 || country == 0 || postcode == ""|| addtype == 0 || type == 0){
                    Alert.alert('Validation failed', 'field(s) with * cannot be empty', [{text: 'Okay'}])
                    return
                  }
        this.setState({ loading: true})
        const formData = new FormData();
        formData.append('feature', "user");
        formData.append('action', "addAddress");
        formData.append('id', user_id);
        formData.append('addr1', addressone);
        formData.append('addr2', addresstwo);
        formData.append('addr3', addressthree);
        formData.append('addrdesc', addressdesc);
        formData.append('deladdr', deladd);
        formData.append('coraddr', colladd);
        formData.append('city', city);
        formData.append('state', 44);
        formData.append('country', country);
        formData.append('addrtype', 1);
        formData.append('postcode', postcode);
        formData.append('type', 1);

        fetch('https://www.ita-obe.com/mobile/v1/user.php', { method: 'POST',  headers: {
          Accept: 'application/json',
        },body:formData,    
        })
        .then(res => res.json())
        .then(res => {
          console.warn(res);
          if(!res.error){
          this.setState({ 
              loading: false,
              cartItems:res.data
            })

          }else{
        Alert.alert('Registration failed', res.message, [{text: 'Okay'}])
        this.setState({ loading: false})
          }
        }).catch((error)=>{
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
        <Left style={{flex:1}}>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name="ios-close" size={38} style={{fontSize: 38}} />
          </Button>
        </Left>
      );
    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => Actions.search()} transparent>
        </Button>
      </Right>
    );
    return(
        <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} right={right} title="New Address" />
        <Content padder>
        <View>
            <Text style={{marginTop: 15, fontSize: 18}}>Add Address</Text>

            <Item regular style={{marginTop: 7}}>
            <Text  style={{paddingLeft: 5, marginLeft: 0}}>*</Text>
                <Input placeholder='Address 1' onChangeText={(text) => this.setState({addressone: text})} placeholderTextColor="#687373" />
            </Item>

            <Item regular style={{marginTop: 7}}>
                <Input placeholder='Address 2' onChangeText={(text) => this.setState({addresstwo: text})} placeholderTextColor="#687373" />
            </Item>

            <Item regular style={{marginTop: 7}}>
                <Input placeholder='Address 3' onChangeText={(text) => this.setState({addressthree: text})} placeholderTextColor="#687373" />
            </Item>

            <Item regular style={{marginTop: 7}}>
            <Text  style={{paddingLeft: 5, marginLeft: 0}}>*</Text>
                <Input placeholder='Address Description' onChangeText={(text) => this.setState({addressdesc: text})} placeholderTextColor="#687373" />
            </Item>

              <ListItem style={{borderWidth: 1, marginTop: 7, borderColor: 'rgba(149, 165, 166, 0.3)', paddingLeft: 10, marginLeft: 0}}>
              <Text style={{paddingLeft: 5, marginLeft: 0}}>Delivery Address</Text>
            
              <Right>
                <Radio selected={this.state.delyes} onPress={() => this.setState({delyes: true, delno: false, deval: true})} />
              </Right>
              <Text style={{paddingLeft: 5, marginLeft: 0}}>Yes</Text>

            
              <Right>
                <Radio selected={this.state.delno} onPress={() => this.setState({delyes: false, delno: true, deval: false})} />
              </Right>
              <Text  style={{paddingLeft: 5, marginLeft: 0}}>No</Text>
            </ListItem>

             <ListItem style={{borderWidth: 1, marginTop: 7, borderColor: 'rgba(149, 165, 166, 0.3)', paddingLeft: 10, marginLeft: 0}}>
              <Text style={{paddingLeft: 5, marginLeft: 0}}>Collection Address</Text>
            
              <Right>
                <Radio selected={this.state.colyes} onPress={() => this.setState({colyes: true, colno: false, coval: true})} />
              </Right>
              <Text style={{marginLeft: 0}}>Yes</Text>
             
              <Right>
                <Radio selected={this.state.colno} onPress={() => this.setState({colyes: false, colno: true, coval: false})} />
              </Right>
              <Text  style={{paddingLeft: 5, marginLeft: 0}}>No</Text>
            </ListItem>

            <Item regular style={{marginTop: 7}}>
            <Text  style={{paddingLeft: 5, marginLeft: 0}}>*</Text>
             <Picker
                  mode="dropdown"
                  placeholder="Select a size"
                  note={true}
                  selectedValue={this.state.countrylist}
                  onValueChange={(size) => this.setState({ countrylist: size, country: size.id })}
                >
                  {this.renderCountry()}
                </Picker>
            </Item>

     
             <Item regular style={{marginTop: 7}}>
             <Text  style={{paddingLeft: 5, marginLeft: 0}}>*</Text>
                <Picker
                  mode="dropdown"
                  placeholder="Select a State"
                  note={true}
                  selectedValue={this.state.statelist}
                  onValueChange={(size) => this.setState({ statelist: size, state: size.id })}
                >
                   {this.renderState()}
                </Picker>

            </Item>
             <Item regular style={{marginTop: 7}}>
             <Text  style={{paddingLeft: 5, marginLeft: 0}}>*</Text>
                <Input placeholder='City' onChangeText={(text) => this.setState({city: text})} placeholderTextColor="#687373" />
            </Item>
              <Item regular style={{marginTop: 7}}>
              <Text  style={{paddingLeft: 5, marginLeft: 0}}>*</Text>
              <Picker
                  mode="dropdown"
                  placeholder="Select a size"
                  note={true}
                  selectedValue={this.state.addtypelist}
                  onValueChange={(size) =>  this.setState({ addtypelist: size, addtype: size.id })}
                >
                  {this.renderAddType()}
                </Picker>
                 </Item>
           
            <Item regular style={{marginTop: 7}}>
            <Text  style={{paddingLeft: 5, marginLeft: 0}}>*</Text>
                <Input placeholder='Postcode' onChangeText={(text) => this.setState({postcode: text})} placeholderTextColor="#687373" />
            </Item>
           
            <Item regular style={{marginTop: 7}}>
            <Text  style={{paddingLeft: 5, marginLeft: 0}}>*</Text>
            <Picker
                  mode="dropdown"
                  placeholder="Select a size"
                  note={true}
                  selectedValue={this.state.typelist}
                  onValueChange={(size) =>  this.setState({ typelist: size, type: size.id })}
                >
                  {this.renderAddType()}
                </Picker>
            </Item>
          </View>
          <View>
          </View>
          <View style={{marginTop: 10, marginBottom: 10, paddingBottom: 7}}>
            <Button onPress={() => this.addAddress()} style={{backgroundColor: Colors.bg_color}} block iconLeft>
              <Text style={{color: '#fdfdfd'}}>Add Address</Text>
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
          style={{marginLeft: 0}}
        >
          <Body style={{paddingLeft: 10}}>
            <Text style={{fontSize: 18}}>
              {item.quantity > 1 ? item.quantity+"x " : null}
              {item.title}
            </Text>
            <Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Color: {item.color}</Text>
            <Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Size: {item.size}</Text>
          </Body>
          <Right>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>{item.price}</Text>
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

  renderCountry(){
 
    let serviceItems = this.state.regions.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s.name} />
     });
    return serviceItems;
  }

  renderState(){
 
    let serviceItems = this.state.states.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s.name} />
     });
    return serviceItems;
  }

  renderAddType(){
    let serviceItems = this.state.addType.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s.name} />
     });
    return serviceItems;
  }

  renderType(){
    let serviceItems = this.state.type.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s.name} />
     });
    return serviceItems;
  }

}


const state_list = 
[
 { id: 0, name:'Select State'} ,
 { id: 34, name:'Kogi'},
 { id: 35, name:'Kwara'}
]
;

const regions_list = 
[
 { id: 0, name:'Select Country'} ,
 { id: 11, name:'Nigeria'},
 { id: 12, name:'United Kindom'},
 { id: 13, name:'United States'}  
]
;


const addresstype_list = 
[
{ id: 0, name:'Select type'} ,
 { id: 1, name:'Home'} ,
 { id: 2, name:'Office'},
 { id: 3, name:'School'}, 
]
;

const type_list = 
[
{ id: 0, name:'Select type'} ,
 { id: 1, name:'Home'} ,
 { id: 2, name:'Office'},
 { id: 3, name:'School'}, 
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




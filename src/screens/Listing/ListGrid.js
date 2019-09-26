'use strict'
import React, {Component} from 'react'
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    Text
} from 'react-native'
import { Container, Content,Icon, View, Button, Left, Right, Card, CardItem, cardBody } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ListPanel from './../../resources/components/ListPanel'

import GridProductThumb from './../../resources/components/product/GridProductThumb'
import Grid from './../../resources/components/Grid'
import colors from './../../resources/styles/colors'


import homeData from './../../data/home'

import Utils from './../../resources/helpers/Utils'


import Navbar from '../navigations/Navbar';


var {height, width} = Dimensions.get('window');
const initWidth = width;
const initHeight = initWidth * (500/900)

class ListGrid extends Component {
 

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data:[],
            title:"",
            cat: "", 
            ctg: "", 
         }
    }


    componentDidMount() {
       this.getProduct();

     }

    componentWillMount() {
         this.setState({cat: this.props.cat, ctg: this.props.ctg, title: this.props.title});
      }
    

    getProduct()
    {
       
      const {cat, ctg} = this.state
        this.setState({ loading: true})
        const formData = new FormData();
        formData.append('feature', "product");
        formData.append('action', "get");
        formData.append('cat', cat);
        formData.append('ctg', "2006");
        formData.append('sct', ctg);
        
        fetch('https://www.ita-obe.com/mobile/v1/product.php', { method: 'POST',  headers: {
          Accept: 'application/json',
        }, body:formData,  
        })
        .then(res => res.json())
        .then(res => {
          console.warn(res.data);
          if(!res.error){
          this.setState({ 
              loading: false,
              data:res.data
            })

          }else{
          Alert.alert('Registration failed', res.message, [{text: 'Okay'}])
          this.setState({ loading: false})
          }
        }).catch((error)=>{
          console.warn(error);
         // alert(error.message);
       });
      
   }



    render() {
        if (this.state.loading) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
                <Text> Getting Products </Text>
              </View>
            );
          }
        var left = (
            <Left style={{ flex: 1 }}>
              <Button onPress={() => Actions.pop()} transparent>
                <Icon name='ios-arrow-back' style={{color: "#FFF"}} />
              </Button>
            </Left>
          );
          var right = (
            <Right style={{ flex: 1 }}>
              <Button onPress={() => Actions.cart()} transparent>
                <Icon name='ios-cart' style={{color: "#FFF"}} />
              </Button>
            </Right>
          );

        return (
           
                <Container>
                    <Navbar left={left} right={right} title={this.state.title} />
                    <ScrollView>
                        {this._renderGridList(this.state.data)}
                    </ScrollView>
                </Container>
        )
    }

    _renderGridList(data) {
        return (
            <ListPanel>
                <Grid>
                    {
                        data.map((item, idx) => {
                            return <GridProductThumb onPress={() => this._pressProduct(item.id)} key={idx} { ...item }/>
                        })
                    }
                </Grid>
            </ListPanel>
        )
    }

    _pressProduct(value){
        Actions.product({id: value })
    }

    _pressSeeAllProducts(){
        Utils.showMessage('You clicked to see all products')
    }

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.bg_header
    },
    headerSub: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logo: {
        width: 64,
        height: 28,
        resizeMode: 'center'
    },
    icoSearch: {
        color: colors.txt_description,
        marginRight: 5
    },
    btnSearchHolder: {
        padding: 15,
        paddingTop: 0
    },
    btnSearch: {
        borderColor: colors.bd_input,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 8,
        backgroundColor: colors.bg1,
        borderWidth: 1,
        borderRadius: 5
    },
    btnSearchTitle: {
        color: colors.txt_description,
        fontSize: 16
    },
    btnDeals: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 0.5
    },
    icoDeals: {
        color: colors.txt_description,
        marginRight: 10
    },
    section_title:{
        fontSize: 18,
        fontWeight: '600',
        padding: 20
    }
})

module.exports = ListGrid

'use strict'
import React, {Component} from 'react'
import {

    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native'
import { Container, Content,Icon, View, Button, Left, Right, Card, CardItem, cardBody } from 'native-base';
import { Actions } from 'react-native-router-flux';

import ListPanel from './../../resources/components/ListPanel'
import SwiperProductThumb from './../../resources/components/product/SwiperProductThumb'

import Swiper from './../../resources/components/Swiper'
import colors from './../../resources/styles/colors'

import Header from './../../resources/components/Header'
import homeData from './../../data/home'

import Utils from './../../resources/helpers/Utils'

import Navbar from '../navigations/Navbar';
import SideMenuDrawer from '../navigations/SideMenuDrawer';

var {height, width} = Dimensions.get('window');
const initWidth = width;
const initHeight = initWidth * (500/900)

class ListSwiper extends Component {

    constructor(props) {
        super(props)
    }

    render() {
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
                <Navbar left={left} right={right} title="MY STORE" />
                <ScrollView>
                    {this._renderSwiperList(homeData.fashions)}
                    {this._renderSwiperList(homeData.watches)}
                    {this._renderSwiperList(homeData.bags)}
                    {this._renderSwiperList(homeData.fashions)}
                    {this._renderSwiperList(homeData.watches)}
                    {this._renderSwiperList(homeData.bags)}
                </ScrollView>
            </Container>
        )
    }

    _renderSwiperList(data) {
        return (
            <ListPanel title={data.title} description={data.description} onPressSeeAll={() => this._pressSeeAllProducts({navBarTitle: data.title})}>
                <Swiper>
                    {
                        data.items.map((item, idx) => {
                            return <SwiperProductThumb onPress={() => this._pressProduct(item.id)} key={idx} { ...item }/>
                        })
                    }
                </Swiper>
            </ListPanel>
        )
    }

    _pressProduct(){
        Actions.product({email: "jesus"});
    }

    _pressSeeAllProducts(){
        Actions.grid({email: "jesus"});
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.bg_color
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

module.exports = ListSwiper

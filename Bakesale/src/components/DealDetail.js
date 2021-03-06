import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

import { priceDisplay } from '../util';
import ajax from '../ajax';

class DealDetail extends Component {
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    deal: this.props.initialDealData,
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({
      deal: fullDeal,
    });
  }

  render() {
    const { deal } = this.state;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
          <Image
            source={{ uri: this.state.deal.media[0] }}
            style={styles.image}
            />
            <View style={styles.detail}>
            <View>
              <Text style={styles.title}>{deal.title}</Text>
            </View>
            <ScrollView style={styles.detail}>
              <View style={styles.footer}>
                <View style={styles.info}>
                  <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                  <Text style={styles.cause}>{deal.cause.name}</Text>
                </View>
                { deal.user && (
                  <View style={styles.user}>
                    <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                    <Text>{deal.user.name}</Text>
                  </View>
                  )}       
              </View>
              <View style={styles.description}>
                <Text>{deal.description}</Text>
              </View>
            </ScrollView>   
            </View>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
    deal: {
      marginHorizontal: 12,
    },
    backLink: {
      marginBottom: 5,
      color: '#22f',
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    title: {
      fontSize: 16,
      padding: 10,
      fontWeight: 'bold',
      backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 15,
    },
    detail: {
      borderColor: '#ddd',
      borderWidth: 1,
      borderStyle: 'dotted',
    },
    info: {
      alignItems: 'center',
    },
    user: {
      alignItems: 'center',
    },
    cause: {
      marginVertical: 10,
    },
    price: {
      fontWeight: 'bold',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    description: {
     
      margin: 10,
      padding: 10,
    },
});

export default DealDetail;
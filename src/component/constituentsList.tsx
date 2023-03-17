import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ConstituentsList = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.stockName}>{props.stockName}</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingRight: 9,
          }}>
          <MaterialCommunityIcons
            name="crown-circle"
            size={22}
            color="#ffd700"
          />
          <Text style={{fontSize: 12, color: 'green', paddingTop: 3}}>
            {props.stockTtile}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <View style={{marginRight: 7}}>
          <Text style={{size: 15, color: 'black', fontWeight: '700'}}>
            {props.price}
          </Text>
          <Text
            style={{
              color: 'green',
              fontSize: 11,
              fontWeight: '400',
            }}>
            {props.changes}
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.bottonView}>
            <Text style={{color: 'black', fontWeight: '700'}}>T</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.bottonView}>
            <Text style={{color: 'black', fontWeight: '500', fontSize: 18}}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ConstituentsList;
const styles = StyleSheet.create({
  container: {
    padding: 3,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  stockName: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },
  bottonView: {
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    marginRight: 7,
    marginTop: 4,
  },
});

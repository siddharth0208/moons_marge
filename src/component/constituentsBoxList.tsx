import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ConstituentsBoxList = props => {
  const num = 1400;
  return (
    <TouchableOpacity
      style={{paddingTop: 0, marginHorizontal: 5}}
      activeOpacity={1}
      onPress={async () => {}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: props.price > num ? '#48A860' : 'red',
          borderRadius: 10,
          shadowOffset: {width: 1, height: 1},
          shadowColor: '#0000001A',
          // shadowRadius: 10,
          shadowOpacity: 0.8,
          marginTop: 10,
          elevation: 5,
          width: (Dimensions.get('window').width - 20) / 2 - 10,
          // paddingVertical: 20,
          marginLeft: 5,
          marginBottom: 5,
          height: 150,
          borderColor: '#F4F4F4',
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
            {props.companyName}
          </Text>
          <MaterialCommunityIcons
            name="crown-circle"
            size={22}
            color="white"
            style={{marginVertical: 5}}
          />
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              fontSize: 20,
            }}>
            {props.price}
          </Text>
          <Text style={{color: 'white', fontWeight: '700', marginTop: 5}}>
            {props.changes}
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>
                T
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 15,
                  alignSelf: 'center',
                }}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ConstituentsBoxList;

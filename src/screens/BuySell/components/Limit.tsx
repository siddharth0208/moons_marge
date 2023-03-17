import {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const Limit = () => {
  const [lot, setLot] = useState(0);
  const [slLimit, setSlLimit] = useState(0);

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>
            Lot
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
              onPress={() => {
                if (lot > 0) setLot(prev => prev - 1);
              }}>
              <View style={{padding: 4}}>
                <Image
                  source={require('../../../../assets/remove.png')}
                  style={{width: 16, height: 16}}
                />
              </View>
            </TouchableNativeFeedback>
            <TextInput
              style={{
                flex: 1,
                marginHorizontal: 8,
                borderBottomWidth: 2,
                borderColor: 'lightgrey',
                paddingVertical: 0,
                paddingHorizontal: 8,
                textAlign: 'center',
                fontSize: 16,
              }}
              keyboardType="number-pad"
              defaultValue={lot.toString()}
            />
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
              onPress={() => {
                setLot(prev => prev + 1);
              }}>
              <View style={{padding: 4}}>
                <Image
                  source={require('../../../../assets/add.png')}
                  style={{width: 16, height: 16}}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          <Text style={{marginTop: 8, textAlign: 'center', fontSize: 12}}>
            [1lot=100]
          </Text>
        </View>
        <View style={{width: 16}} />
        <View style={{flex: 1}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>
            SL Limit
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
              onPress={() => {
                if (slLimit > 0) setSlLimit(prev => prev - 1);
              }}>
              <View style={{padding: 4}}>
                <Image
                  source={require('../../../../assets/remove.png')}
                  style={{width: 16, height: 16}}
                />
              </View>
            </TouchableNativeFeedback>
            <TextInput
              style={{
                flex: 1,
                marginHorizontal: 8,
                borderBottomWidth: 2,
                borderColor: 'lightgrey',
                paddingVertical: 0,
                paddingHorizontal: 8,
                textAlign: 'center',
                fontSize: 16,
              }}
              keyboardType="number-pad"
              defaultValue={slLimit.toString()}
            />
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
              onPress={() => {
                setSlLimit(prev => prev + 1);
              }}>
              <View style={{padding: 4}}>
                <Image
                  source={require('../../../../assets/add.png')}
                  style={{width: 16, height: 16}}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <Image
              source={require('../../../../assets/info.png')}
              style={{width: 16, height: 16}}
            />
            <Text style={{marginLeft: 8, fontSize: 12}}>Range</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 16}}>
        <Text>Click here to update Approx. Margin</Text>
        <Text style={{marginTop: 8}}>Approx. Margin: $0</Text>
        <Text>Available Margin: $0</Text>
        <View
          style={{marginTop: 16, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Limit your loss or set target for profit
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'black',
                flex: 1,
                fontWeight: 'bold',
              }}>
              Cover order, Bracket Order
            </Text>
          </View>
          <Image
            source={require('../../../../assets/add.png')}
            style={{width: 28, height: 28, marginLeft: 8}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text style={{fontSize: 16, color: 'black'}}>Validity DAY</Text>
          </View>
          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text style={{fontSize: 16, color: 'black'}}>
              After Market Order
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Limit;

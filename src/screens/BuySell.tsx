import {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';

interface BuySellProps {
  navigation: any;
  route: any;
}
const BuySell = ({navigation, route}: BuySellProps) => {
  const {data} = route.params;
  console.log(data);

  const [operation, setOperation] = useState<string>();

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          backgroundColor: 'white',
          elevation: 8,
        }}>
        <View style={{flexDirection: 'row', padding: 16}}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/close.png')}
              style={{width: 32, height: 32}}
            />
          </TouchableNativeFeedback>

          <View style={{marginLeft: 16, flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
                {data.scripDetail.displaySymbol}
              </Text>
              <View style={{marginLeft: 8, alignSelf: 'center'}}>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 12,
                    backgroundColor: 'lightgrey',
                    borderRadius: 2,
                    paddingVertical: 1,
                    paddingHorizontal: 4,
                  }}>
                  NESCDS
                </Text>
              </View>
            </View>

            <Text style={{fontSize: 16, color: 'grey'}}>13 APR 59.2500 CE</Text>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
              1600 0.00000 (0.0)
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'lightgrey',
                borderRadius: 16,
              }}>
              <View style={{borderRadius: 15, overflow: 'hidden'}}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
                  onPress={() => {
                    // navigation.goBack();
                    setOperation('BUY');
                  }}>
                  <View>
                    <Text
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        backgroundColor:
                          operation == 'BUY' ? 'green' : 'transparent',
                        borderRadius: 16,
                        color: operation == 'BUY' ? 'white' : 'green',
                      }}>
                      BUY
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View style={{borderRadius: 15, overflow: 'hidden'}}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
                  onPress={() => {
                    setOperation('SELL');
                    // navigation.goBack();
                  }}>
                  <View>
                    <Text
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        borderRadius: 16,
                        backgroundColor:
                          operation == 'SELL' ? 'green' : 'transparent',
                        color: operation == 'SELL' ? 'white' : 'green',
                      }}>
                      Sell
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: 'darkblue',
            alignSelf: 'flex-start',
            position: 'relative',
          }}>
          <View style={{minWidth: 96}}>
            <Text style={{textAlign: 'right', fontSize: 12}}>-</Text>
            <Text style={{textAlign: 'right', fontSize: 12}}>Qty -</Text>
          </View>
          <Text
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: 'darkblue',
              color: 'white',
              paddingHorizontal: 6,
              paddingVertical: 2,
              fontSize: 12,
            }}>
            NSECDS
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 12}}>
          <View>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 4,
                // backgroundColor: 'lightgrey',
              }}>
              <Text
                style={{
                  color: 'darkblue',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                INTRADAY
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Buy & Sell Today
              </Text>
            </View>

            <View
              style={{
                height: 4,
                backgroundColor: 'darkblue',
                borderRadius: 2,
              }}
            />
          </View>
          <View>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 4,
                // backgroundColor: 'lightgrey',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Multiple Order
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Buy/Sell in Multiple Legs
              </Text>
            </View>

            <View style={{height: 4}} />
          </View>
        </View>
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={{padding: 16}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                Lot
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/remove.png')}
                  style={{width: 24, height: 24, marginLeft: 8}}
                />
                <TextInput
                  style={{
                    flex: 1,
                    marginHorizontal: 8,
                    borderBottomWidth: 2,
                    borderColor: 'lightgrey',
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                  }}
                />
                <Image
                  source={require('../../assets/add.png')}
                  style={{width: 24, height: 24, marginLeft: 8}}
                />
              </View>
              <Text style={{marginTop: 8, textAlign: 'center'}}>
                [1lot=100]
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                SL Limit
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/remove.png')}
                  style={{width: 24, height: 24, marginLeft: 8}}
                />
                <TextInput
                  style={{
                    flex: 1,
                    marginHorizontal: 8,
                    borderBottomWidth: 2,
                    borderColor: 'lightgrey',
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                  }}
                />
                <Image
                  source={require('../../assets/add.png')}
                  style={{width: 24, height: 24, marginLeft: 8}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 2,
                }}>
                <Image
                  source={require('../../assets/info.png')}
                  style={{width: 24, height: 24}}
                />
                <Text style={{marginLeft: 8}}>Range</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 16}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                SL Limit
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/remove.png')}
                  style={{width: 24, height: 24, marginLeft: 8}}
                />
                <TextInput
                  style={{
                    flex: 1,
                    marginHorizontal: 8,
                    borderBottomWidth: 2,
                    borderColor: 'lightgrey',
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                  }}
                />
                <Image
                  source={require('../../assets/add.png')}
                  style={{width: 24, height: 24, marginLeft: 8}}
                />
              </View>
              <Text style={{marginTop: 8}}>Buy upto limit after Trigger</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 2,
                }}>
                <Image
                  source={require('../../assets/info.png')}
                  style={{width: 24, height: 24}}
                />
                <Text style={{marginLeft: 8}}>Range</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{padding: 16}}>
          <Text>Click here to update Approx. Margin</Text>
          <Text style={{marginTop: 8}}>Approx. Margin: $0</Text>
          <Text>Available Margin: $0</Text>
          <View
            style={{marginTop: 16, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: 'black'}}>Disclosed Lot</Text>
            <Image
              source={require('../../assets/add.png')}
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
      </ScrollView>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          backgroundColor: 'white',
          elevation: 8,
          padding: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'darkblue'}}>
            Brokerage and charges
          </Text>
          <Image
            source={require('../../assets/arrow_forward.png')}
            style={{width: 32, height: 32, marginLeft: 8}}
          />
        </View>

        <Text
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: 'green',
            fontSize: 20,
            color: 'white',
            borderRadius: 8,
            textAlign: 'center',
            marginTop: 16,
          }}>
          Place Order
        </Text>
      </View>
    </View>
  );
};
export default BuySell;

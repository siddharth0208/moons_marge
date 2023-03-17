import {useState} from 'react';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Limit from './components/Limit';
import SLLimit from './components/SLLimit';
import SLMarket from './components/SLMarket';

interface BuySellProps {
  navigation: any;
  route: any;
}

const tabs = [
  {
    id: 'MARGIN',
    title: 'Margin',
    description: 'Buy & Sell Today',
  },
  {
    id: 'DELIVERY',
    title: 'Delivery',
    description: 'Hold Long Term',
  },
  {
    id: 'MTF',
    title: 'MTF',
    description: 'Margin Trading Funding',
  },
];
const deliveryTypes = [
  {
    id: 'MARGIN_PRICE',
    title: 'Margin Price',
  },
  {
    id: 'LIMIT',
    title: 'Limit',
  },
  {
    id: 'SL_MARKET',
    title: 'SL Market',
  },
  {
    id: 'SL_LIMIT',
    title: 'SL Limit',
  },
];

const BuySell = ({navigation, route}: BuySellProps) => {
  const {data} = route.params;
  console.log(data);

  const [operation, setOperation] = useState<string>('BUY');
  const [selectedTab, setSelectedTab] = useState<string>('MARGIN');
  const [selectedDeliveryType, setSelectedDeliveryType] =
    useState<string>('LIMIT');
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
              source={require('../../../assets/close.png')}
              style={{width: 32, height: 32}}
            />
          </TouchableNativeFeedback>

          <View style={{marginLeft: 16, flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
                {data.scripDetail.displaySymbol}
              </Text>
              <View style={{marginLeft: 8, alignSelf: 'center'}}>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 10,
                    backgroundColor: 'lightgrey',
                    borderRadius: 2,
                    paddingVertical: 1,
                    paddingHorizontal: 4,
                  }}>
                  {data.scripDetail._ExchangeName}
                </Text>
              </View>
              <Text style={{fontSize: 10, alignSelf: 'center', marginLeft: 8}}>
                {data.scripDetail._Series}
              </Text>
            </View>

            <Text>
              <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                {data.LTP}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: data.LTPTrend == 'color-positive' ? 'green' : 'red',
                  fontWeight: 'bold',
                }}>
                {'   ' + data.NetChangeInRs + ' ' + data.PercNetChange}
              </Text>
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
                        fontSize: 12,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
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
                        fontSize: 12,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 16,
                        backgroundColor:
                          operation == 'SELL' ? 'red' : 'transparent',
                        color: operation == 'SELL' ? 'white' : 'red',
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
          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {tabs.map(tab => {
              return (
                <View key={tab.id}>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(
                      '#90CAF9',
                      false,
                    )}
                    onPress={() => {
                      setSelectedTab(tab.id);
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 24,
                        paddingVertical: 6,
                        // backgroundColor: 'lightgrey',
                      }}>
                      <Text
                        style={{
                          color: selectedTab == tab.id ? 'darkblue' : 'grey',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        {tab.title}
                      </Text>
                      <Text
                        style={{
                          color: selectedTab == tab.id ? 'darkblue' : 'grey',
                          fontWeight: 'bold',
                          fontSize: 12,
                        }}>
                        {tab.description}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>

                  <View
                    style={{
                      height: 4,
                      backgroundColor:
                        selectedTab == tab.id ? 'darkblue' : 'transparent',
                      borderRadius: 2,
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <ScrollView style={{flex: 1, padding: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 4,
            borderColor: 'darkblue',
          }}>
          {deliveryTypes.map(type => {
            return (
              <View
                style={{
                  alignSelf: 'stretch',
                }}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
                  onPress={() => {
                    setSelectedDeliveryType(type.id);
                  }}>
                  <Text
                    key={type.id}
                    style={{
                      fontSize: 12,
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      backgroundColor:
                        selectedDeliveryType == type.id
                          ? 'darkblue'
                          : 'transparent',
                      color:
                        selectedDeliveryType == type.id ? 'white' : 'darkblue',
                    }}>
                    {type.title}
                  </Text>
                </TouchableNativeFeedback>
              </View>
            );
          })}
        </View>
        <View style={{marginTop: 16}}>
          {selectedDeliveryType === 'LIMIT' && <Limit />}
          {selectedDeliveryType === 'SL_MARKET' && <SLMarket />}
          {selectedDeliveryType === 'SL_LIMIT' && <SLLimit />}
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
            source={require('../../../assets/arrow_forward.png')}
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

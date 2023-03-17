import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConstituentsList from '../component/constituentsList';
import ConstituentsBoxList from '../component/constituentsBoxList';

const Constituents = ({navigation}) => {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [stockData, setStockData] = useState([]);
  console.log('stockData', stockData);
  useEffect(() => {
    pushStockData();
  }, []);
  const pushStockData = () => {
    let StockArraydata = [];
    for (let i = 0; i < 15; i++) {
      StockArraydata.push({
        companyName: 'AXISBANK',
        title: 'vol.Gainer',
        index: 'NSE',
        value: 1035.78 + Math.floor(Math.random() * 999),
        changes: '+3.65(+0.44%)',
      });
    }
    setStockData(StockArraydata);
  };
  const renderItem = ({item}) => {
    return (
      <View>
        <ConstituentsList
          stockName={item.companyName}
          stockTtile={item.title}
          price={item.value}
          changes={item.changes}
        />
        <View
          style={{
            borderWidth: 0.2,
            width: '100%',
            color: '#EBECF0',
            marginTop: 23,
          }}></View>
      </View>
    );
  };
  const renderItembox = ({item}) => {
    console.log('item', item);
    return (
      <ConstituentsBoxList
        companyName={item.companyName}
        price={item.value}
        changes={item.changes}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.switchBotton}>
          <TouchableOpacity
            style={{
              width: '50%',
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              backgroundColor: selectedFilter == 1 ? 'white' : 'transparent',
            }}
            onPress={() => {
              setSelectedFilter(1);
            }}>
            <AntDesign
              name="bars"
              size={25}
              color={selectedFilter == 1 ? 'black' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              backgroundColor: selectedFilter == 2 ? 'white' : 'transparent',
            }}
            onPress={() => {
              setSelectedFilter(2);
            }}>
            <AntDesign
              name="appstore1"
              size={22}
              color={selectedFilter == 2 ? 'black' : 'gray'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'row', marginRight: 20, alignItems: 'center'}}>
          <TouchableOpacity>
            <Ionicons
              name="search-sharp"
              size={20}
              color="black"
              style={{marginRight: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="list-sharp" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {/* {selectedFilter == 0 ? ( */}
      <View style={{marginTop: 10, marginBottom: 50, width: '100%'}}>
        <FlatList
          key={selectedFilter}
          numColumns={selectedFilter}
          data={stockData}
          renderItem={selectedFilter == 1 ? renderItem : renderItembox}
          keyExtractor={(_, index) => `item-${index}`}
        />
      </View>
    </View>
  );
};
export default Constituents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    marginTop: 10,
    // height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchBotton: {
    flexDirection: 'row',
    padding: 3,
    backgroundColor: 'rgba(0,0,0,0.07)',
    width: 90,
    borderRadius: 5,
    marginLeft: 10,
  },
});

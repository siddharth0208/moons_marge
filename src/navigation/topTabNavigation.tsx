import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Overview from '../screens/Overview';
import Features from '../screens/Futures';
import OptionChain from '../screens/OptionChain';
import {NavigationContainer} from '@react-navigation/native';
import Constituents from '../screens/Constituents';
import Futures from '../screens/Futures';
import {Dimensions} from 'react-native';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      scrollEnabled={true}
      screenOptions={{
        tabBarScrollEnabled: true,
        // tabContainerStyle: {width: '100%', paddingHorizontal: 10},
        // scrollEnabled: true,

        tabStyle: {
          height: 40,
          marginHorizontal: 0,
          width: 'auto',
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
          textTransform: 'none',
        },
        style: {padding: 0},
      }}>
      <Tab.Screen
        name="Constituents"
        component={Constituents}
        options={{tabBarLabel: 'Constituents'}}
      />
      <Tab.Screen
        name="OverView"
        component={Overview}
        options={{tabBarLabel: 'Overview'}}
      />
      <Tab.Screen
        name="Futures"
        component={Futures}
        options={{tabBarLabel: 'Futures'}}
      />
      <Tab.Screen
        name="OptionChain"
        component={OptionChain}
        options={{tabBarLabel: 'Option Chain'}}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;

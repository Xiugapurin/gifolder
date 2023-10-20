import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Icons, Colors} from './src/utils';
import {Home, Image, Search, Upload} from './src/pages';
import {Text} from 'react-native';
import {useCreateTable} from './src/hooks/useImage';
import {Error, Loading} from './src/components';

const {PRIMARY, INACTIVE} = Colors;
const {Entypo, Ionicons} = Icons;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTab = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => {
        let icon;
        const iconColor = focused ? PRIMARY : INACTIVE;

        switch (route.name) {
          case 'Home':
            icon = <Ionicons name="image-sharp" color={iconColor} size={24} />;
            break;
          case 'Search':
            icon = <Ionicons name="search" color={iconColor} size={24} />;
            break;
          case 'Upload':
            icon = <Entypo name="plus" color={iconColor} size={24} />;
            break;
          default:
            break;
        }

        return icon;
      },
      tabBarLabel: ({focused}) => {
        let label;
        const labelColor = focused ? PRIMARY : INACTIVE;

        switch (route.name) {
          case 'Home':
            label = (
              <Text
                style={{
                  color: labelColor,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                圖庫
              </Text>
            );
            break;
          case 'Search':
            label = (
              <Text
                style={{
                  color: labelColor,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                搜尋
              </Text>
            );
            break;
          case 'Upload':
            label = (
              <Text
                style={{
                  color: labelColor,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                新增
              </Text>
            );
            break;
          default:
            break;
        }

        return label;
      },
      tabBarHideOnKeyboard: true,
      tabBarStyle: {height: 64, paddingTop: 6, paddingBottom: 12},
      headerShown: false,
    })}>
    <Tab.Screen name="Home" component={Home} options={{unmountOnBlur: true}} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen
      name="Upload"
      component={Upload}
      options={{unmountOnBlur: true}}
    />
  </Tab.Navigator>
);

const App = () => {
  const {isLoading, error} = useCreateTable();

  if (isLoading) {
    <Loading />;
  }

  if (error) {
    <Error error={error} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
        <Stack.Screen name="Root" component={MainTab} />
        <Stack.Screen name="Image" component={Image} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

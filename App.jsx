import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

import SettingImage from './src/assets/images/Dorito.png';
import {Icons, Colors} from './src/utils';
import {Changelog, Home, Image, Search, Setting, Upload} from './src/pages';
import {useCreateTable, useDeleteImagesTable} from './src/hooks/useImage';
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
            icon = (
              <Entypo name="home" color={iconColor} size={focused ? 24 : 20} />
            );
            break;
          case 'Search':
            icon = (
              <Ionicons
                name="search"
                color={iconColor}
                size={focused ? 28 : 20}
              />
            );
            break;
          case 'Upload':
            icon = (
              <Entypo name="plus" color={iconColor} size={focused ? 32 : 24} />
            );
            break;
          case 'Setting':
            icon = (
              <FastImage
                source={SettingImage}
                tintColor={Colors.Yellow}
                style={{width: focused ? 36 : 28, aspectRatio: 1}}
              />
            );
            break;
          default:
            break;
        }

        return icon;
      },
      // tabBarLabel: ({focused}) => {
      //   let label;
      //   const labelColor = focused ? PRIMARY : INACTIVE;

      //   switch (route.name) {
      //     case 'Home':
      //       label = (
      //         <Text
      //           style={{
      //             color: labelColor,
      //             fontSize: 12,
      //             fontWeight: 'bold',
      //           }}>
      //           圖庫
      //         </Text>
      //       );
      //       break;
      //     case 'Search':
      //       label = (
      //         <Text
      //           style={{
      //             color: labelColor,
      //             fontSize: 12,
      //             fontWeight: 'bold',
      //           }}>
      //           搜尋
      //         </Text>
      //       );
      //       break;
      //     case 'Upload':
      //       label = (
      //         <Text
      //           style={{
      //             color: labelColor,
      //             fontSize: 12,
      //             fontWeight: 'bold',
      //           }}>
      //           新增
      //         </Text>
      //       );
      //       break;
      //     default:
      //       break;
      //   }

      //   return label;
      // },
      tabBarHideOnKeyboard: true,
      tabBarStyle: {height: 64, paddingTop: 6, paddingBottom: 12},
      tabBarShowLabel: false,
      // tabBarItemStyle: {
      //   borderRightColor: Colors.GRAY,
      //   borderLeftColor: Colors.GRAY,
      //   borderTopColor: 'transparent',
      //   borderBottomColor: 'transparent',
      //   borderWidth: 0.5,
      // },
      headerShown: false,
    })}>
    <Tab.Screen name="Home" component={Home} options={{unmountOnBlur: true}} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen
      name="Upload"
      component={Upload}
      options={{unmountOnBlur: true}}
    />
    <Tab.Screen name="Setting" component={Setting} />
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 500,
        }}>
        <Stack.Screen name="Root" component={MainTab} />
        <Stack.Screen name="Image" component={Image} />
        <Stack.Screen name="Changelog" component={Changelog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icons, Colors } from "./src/utils";
import { Home ,Search, Upload } from './src/pages';
import { Text } from 'react-native';

const { PRIMARY, INACTIVE } = Colors;
const { Entypo,Ionicons } = Icons;

const Tab = createBottomTabNavigator();

const MainTab = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let icon;
      const iconColor = focused ? PRIMARY : INACTIVE;

      switch (route.name) {
        case "Home":
          icon = <Entypo name="back-in-time" color={iconColor} size={26} />;
          break;
        case "Search":
          icon = <Ionicons name="search" color={iconColor} size={24} />;
          break;
        case "Upload":
          icon = <Ionicons name="image-sharp" color={iconColor} size={24} />;
          break;
        default:
          break;
      }

      return icon;
    },
    tabBarLabel: ({ focused }) => {
      let label;
      const labelColor = focused ? PRIMARY : INACTIVE;

      switch (route.name) {
        case "Recent":
          label = <Text style={{color:labelColor, fontSize: 12, fontWeight:"bold"}}>最近使用</Text>
          break;
        case "Search":
          label = <Text style={{color:labelColor, fontSize: 12, fontWeight:"bold"}}>搜尋</Text>
          break;
        case "Upload":
          label = <Text style={{color:labelColor, fontSize: 12, fontWeight:"bold"}}>新增圖片</Text>
          break;
        default:
          break;
      }

      return label;
    },
    tabBarHideOnKeyboard: true,
    tabBarStyle: { height: 64, paddingTop: 6, paddingBottom: 12 },
    headerShown: false,
  })}>
    <Tab.Screen name="Recent" component={Home} options={{unmountOnBlur:true}} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Upload" component={Upload} options={{unmountOnBlur:true}} />
  </Tab.Navigator>
)

const  App = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            const iconColor = focused ? PRIMARY : INACTIVE;

            switch (route.name) {
              case "Home":
                icon = <Ionicons name="image-sharp" color={iconColor} size={24} />;
                break;
              case "Search":
                icon = <Ionicons name="search" color={iconColor} size={24} />;
                break;
              case "Upload":
                icon = <Entypo name="plus" color={iconColor} size={24} />;
                break;
              default:
                break;
            }

            return icon;
          },
          tabBarLabel: ({ focused }) => {
            let label;
            const labelColor = focused ? PRIMARY : INACTIVE;

            switch (route.name) {
              case "Home":
                label = <Text style={{color:labelColor, fontSize: 12, fontWeight:"bold"}}>圖庫</Text>
                break;
              case "Search":
                label = <Text style={{color:labelColor, fontSize: 12, fontWeight:"bold"}}>搜尋</Text>
                break;
              case "Upload":
                label = <Text style={{color:labelColor, fontSize: 12, fontWeight:"bold"}}>新增</Text>
                break;
              default:
                break;
            }

            return label;
          },
          tabBarHideOnKeyboard: true,
          tabBarStyle: { height: 64, paddingTop: 6, paddingBottom: 12 },
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={Home} options={{unmountOnBlur:true}} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Upload" component={Upload} options={{unmountOnBlur:true}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

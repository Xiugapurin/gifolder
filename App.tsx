import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Icons, Colors } from "./src/utils";
import { Recent, Folder, Upload } from './src/pages';
import { Text } from 'react-native';

const { PRIMARY, INACTIVE } = Colors;
const { Entypo } = Icons;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTab = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let icon;
      const iconColor = focused ? PRIMARY : INACTIVE;

      switch (route.name) {
        case "Recent":
          icon = <Entypo name="back-in-time" color={iconColor} size={26} />;
          break;
        case "Folder":
          icon = <Entypo name="folder" color={iconColor} size={20} />;
          break;
        case "Upload":
          icon = <Entypo name="upload" color={iconColor} size={20} />;
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
          label = <Text style={{color:labelColor, fontSize: 12}}>最近使用</Text>
          break;
        case "Folder":
          label = <Text style={{color:labelColor, fontSize: 12}}>收藏夾</Text>
          break;
        case "Upload":
          label = <Text style={{color:labelColor, fontSize: 12}}>新增圖片</Text>
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
    <Tab.Screen name="Recent" component={Recent} />
    <Tab.Screen name="Folder" component={Folder} />
    <Tab.Screen name="Upload" component={Upload} />
  </Tab.Navigator>
)

const  App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

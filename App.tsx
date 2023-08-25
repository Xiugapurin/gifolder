import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icons, Colors } from "./src/utils";
import { Recent, Folder } from './src/pages';
import { Text } from 'react-native';

const { PRIMARY_COLOR, INACTIVE_COLOR } = Colors;
const { Entypo } = Icons;

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          const iconColor = focused ? PRIMARY_COLOR : INACTIVE_COLOR;

          switch (route.name) {
            case "Recent":
              icon = <Entypo name="back-in-time" color={iconColor} size={26} />;
              break;
            case "Folder":
              icon = <Entypo name="folder" color={iconColor} size={20} />;
              break;
            default:
              break;
          }

          return icon;
        },
        tabBarLabel: ({ focused }) => {
          let label;
          const labelColor = focused ? PRIMARY_COLOR : INACTIVE_COLOR;

          switch (route.name) {
            case "Recent":
              label = <Text style={{color:labelColor, fontSize: 12}}>最近使用</Text>
              break;
            case "Folder":
              label = <Text style={{color:labelColor, fontSize: 12}}>收藏夾</Text>
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

// components/CustomTabBar.js
import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const { width } = Dimensions.get("window");
const tabHeight = 90;

const CustomTabBar = ({  state ,descriptors, navigation }) => {
  const getIconName = (routeName) => {
    switch (routeName) {
        case "YoloPay":
            return "qr-code-outline";
          case "Ginie":
        return "stats-chart";
      case "Home":
        return "home-outline";
    }
  };

  return (
    <View style={styles.container}>
      <Svg width={width} height={tabHeight + 30} style={styles.svg}>
        <Path
          fill="black"
          d={`
            M0 35
            L${width * 0.25} 7
            Q ${width * 0.7} -10, ${width * 0.95} 30
            L${width} 40
            L${width} ${tabHeight + 40}
            L0 ${tabHeight + 30}
            Z
          `}
        />
      </Svg>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = getIconName(route.name);
          const iconColor = isFocused ? "white" : "grey";
          const borderColor = isFocused ? "white" : "grey"; 

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabButton,
                {   borderColor: borderColor, },
              ]}
              activeOpacity={0.8}
            >
             {route.name === "YoloPay" ? (
  <MaterialCommunityIcons name="qrcode-scan" size={24} color={iconColor} />
) : (
  <Ionicons name={iconName} size={24} color={iconColor} />
)}   
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: tabHeight + 20,
    width,
  },
  svg: {
    position: "absolute",
    bottom: 0,
    zIndex: 0, 
    borderWidth:1,
    borderBlockColor:"white"


  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: tabHeight,
    width,
    zIndex: 6,

  },

  tabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  
    // Android shadow
    elevation: 6, // Android still only allows bottom shadows
  
    // iOS shadow (darker and upward)
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10, // Negative for upward shadow
    },
    shadowOpacity: 0.5, // Between 0 and 1
    shadowRadius: 8,
  },
});

export default CustomTabBar;
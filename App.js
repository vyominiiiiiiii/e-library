import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from "react-navigation";
import {createBottonTabNavigator} from "react-navigation-tabs";
import TransactionScreen from "./screens/bookTransactionsScreen";
import SearchScreen from "./screens/searchScreen";

export default class App extends React.Component {
  render(){
  return (
    <AppContainer/>
  );
  }
}
const TabNavigator=createBottonTabNavigator({
  Transaction:{screen:TransactionScreen},
  Search:{screen:SearchScreen}
});
const AppContainer=createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

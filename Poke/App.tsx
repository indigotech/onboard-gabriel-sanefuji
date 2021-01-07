import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {EmailInput, SenhaInput} from './src/components/login-input';
import {SubmitButton} from './src/components/submit-button';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.simple}>Bem vindo(a) à Taqtile!</Text>
            
            <EmailInput />
            <SenhaInput />
            <SubmitButton />

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  simple: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

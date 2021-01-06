# Onboard - Sanefuji

## Project Name
Poke 
## Project's description 
First Taqtile project to learn Git and React Native TypeScript basics.
## Environment and tools
Development on a Macbook Pro, react native framework and typescript language.
* node: v12.17.0
* npm: 6.14.4
* nvm: 0.35.3
* react: 16.13.1
* react-native: 0.63.4
* Xcode: 11.6
## Steps to run and debug
Start by installing some dependencies. Firstly, on ./Poke, run `npm install` so that Node and Watchman works properly when building the app.
Afterwards, run `npx react-native start`.
#### IOS
For the IOS, it's necessary to install pods. Therefore, on ./Poke/ios run `pod install`. There should be a new folder named "pods".
Ensure that, if no IOS device is connected, there is an IOS simulator.
Then, open another terminal, go to ./Poke and run `npx react-native run-ios`. The app should be running on the IOS shortly.
#### Android
For the Android, you can just open another terminal, go to ./Poke and run `npx react-native run-android`. The app should start running shortly. Just as the IOS, ensure that, if no Android device is connected, there is an Android simulator. 

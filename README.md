## Secured mobile PDF viewer app
React native based secured mobile app to sign PDF documents with private 2048 bit RSA key. 
Both public and private keys generate on user mobile device during registration. 
Private key never leaves mobile storage. Signature verification proceed on the server using 
asymmetric cryptography principles along with RSA signing and verification algorithms.

### Demo
<img src="signer-gif.gif" width="270" height="540" />

### Set up
1. download diploma-mobile-app<br/>
2. npm install - install all dependencies
3. react-native link - link all react-native dependencies
4. react-native run-ios(android) - to run application on ios or android emulator

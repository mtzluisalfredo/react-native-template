## React Native custom authentication with React hooks, React Native and AWS Amplify

> Main code is located at [App.js](https://github.com/dabit3/react-native-custom-authentication/blob/master/App.js)

## To deploy this app

1. Clone the repo and change into the directory

```sh
git clone git@github.com:mtzluisalfredo/react-native-template.git

cd react-native-template
```

2. Install dependencies

```sh
npm i

# or

yarn
```

3. Deploy the authentication service

```sh
amplify init

amplify push
```

4. Run the app

```sh
cd ios
pod install
cd ..
react-native run-ios


# or

react-native run-android
```

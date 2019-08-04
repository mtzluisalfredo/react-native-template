import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/u;
const icons = {
  'ios-person': [30, '#bbb'],
  'ios-person--big': [50, '#bbb'],
  // Use other Icon provider, see the logic at L39
  'user-circle': [30, '#bbb', FontAwesome5],
  'user-circle--active': [30, '#fff', FontAwesome5],
  project: [30, '#bbb', Octicons],
  'project--active': [30, '#fff', Octicons],
  'location-city': [30, '#bbb', MaterialIcons],
  'location-city--active': [30, '#fff', MaterialIcons],

  'home-map-marker': [30, '#bbb', MaterialCommunityIcons],
  'home-map-marker--active': [30, '#fff', MaterialCommunityIcons],

  'filter-variant': [30, '#bbb', MaterialCommunityIcons],
  'filter-variant--active': [30, '#fff', MaterialCommunityIcons],
  'ios-arrow-down': [30, '#bbb', Ionicons],
  'ios-arrow-down--active': [30, '#fff', Ionicons],


};

const defaultIconProvider = Ionicons;
const iconsApp = () => {
  const iconsMap = {};
  const iconsLoaded = new Promise(resolve => {
    Promise.all(
      Object.keys(icons).map(iconName => {
        const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
        return Provider.getImageSource(
          iconName.replace(replaceSuffixPattern, ''),
          icons[iconName][0],
          icons[iconName][1],
        );
      }),
    ).then(sources => {
      Object.keys(icons).forEach(
        (iconName, idx) => {
          (iconsMap[iconName] = sources[idx]);
        },
      );
      // Call resolve (and we are done)
      resolve(true);
    });
  });
  return { iconsMap, iconsLoaded };
};

export default iconsApp;

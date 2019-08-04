import { Navigation } from 'react-native-navigation';
import { setRoot } from './services/navigation';
import iconsApp from './Icons';

const { iconsMap, iconsLoaded } = iconsApp();

export const goHome = () => iconsLoaded.then(() => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'SideDrawer',
            name: 'Home',
          },
        },
        center: {
          bottomTabs: {
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'Home',
                        options: {
                          topBar: {
                            visible: true,
                            title: {
                              text: 'Carousell',
                              fontSize: 20,
                              color: '#042C5C',
                            },
                            leftButtons: [
                              {
                                id: 'toggleDrawer',
                                icon: iconsMap['location-city'],
                                color: '#042C5C',
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      text: 'Home',
                      testID: 'Home',
                      fontSize: 15,
                      icon: iconsMap['location-city'],
                      textColor: '#fff',
                    },
                    bottomTabs: {
                      backgroundColor: '#F8F9F9',
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
});

export const goToAuth = () => setRoot('stack', 'SignIn', [
  {
    component: {
      name: 'Auth',
    },
  },
]);

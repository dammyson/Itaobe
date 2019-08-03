import  {createStackNavigator, createAppContainer} from 'react-navigation';

import Splash from '../splash/Splash';
import SignIn from '../users/SignIn';
import SignUp from '../users/SignUP';
import Home from './../../screens/Home';
import ListSwiper from './../../screens/Listing/ListSwiper';
import ListGrid from './../../screens/Listing/ListGrid';





const AppNavigator = createStackNavigator({

  /* */
    Splash: {screen: Splash,
    navigationOptions: {
      header:null 
    }},
      SignIn: {screen: SignIn,
        navigationOptions: {
          header:null 
        }},
     SignUp: {screen: SignUp,
      navigationOptions: {
        header:null 
      }},  
      Home: {screen: Home,
        navigationOptions: {
          header:null 
        }}, 

        ListSwiper: {screen: ListSwiper,
          navigationOptions: {
            header:null 
          }}, 
          ListGrid: {screen: ListGrid,
            navigationOptions: {
              header:null 
            }}, 

}
);

const App = createAppContainer(AppNavigator);

export default App;


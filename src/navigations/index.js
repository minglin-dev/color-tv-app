import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import UserList from '../screens/UserList';
import UserDetail from '../screens/UserDetail';
import PhotoDetail from '../screens/PhotoDetail';

const appStack = createStackNavigator({
    userListScreen: { screen: UserList, navigationOptions: { title: 'Search Users' } },
    userDetailScreen: { screen: UserDetail, navigationOptions: { title: 'User Details' } },
    photoDetailScreen: { screen: PhotoDetail , navigationOptions: { title: 'Preview Photos' } }
}, {
    navigationOptions: {
        headerShown: false
    }
});

const AppConstainer = createAppContainer(appStack);

export default AppConstainer;
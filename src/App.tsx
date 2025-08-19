import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet, useNavigation } from 'react-router-dom';
import GlobalSpinner from './components/GlobalSpinner/GlobalSpinner';

function App(){
    const navigation = useNavigation();
    // The useNavigation hook provides information about the current navigation state.
    // It can be used to determine if the app is currently navigating, which can be useful for showing loading indicators or disabling UI elements during transitions.
    const isLoading = navigation.state === 'loading';
    //const isNavigating = navigation.state === 'navigating';
    // The isLoading and isNavigating variables can be used to conditionally render loading indicators or disable UI elements during navigation.
    const isNavigating = Boolean(navigation.location);
    return (
        <>
            <Header/>
            [/* The Outlet component is used to render the child routes defined in the router configuration. */]
            {isNavigating && <GlobalSpinner/>}
            <Outlet/>
            <Footer/>
        </>
    )
}

export default App;
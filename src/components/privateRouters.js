import propTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRouter({ component: Component, ...rest }){
    if(0){
        return <Redirect to='/login' />;
    }

    return (
        <Route {...rest} render={props => <Component {...props} />} />
    );
}

PrivateRouter.propTypes = {
    Component: propTypes.func
};
import propTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase'

export default function PrivateRouter({ component: Component, ...rest }){
    return (
        <>
            {!auth.currentUser && <Redirect to='/login' />}
            <Route {...rest} render={props => <Component {...props} />} />
        </>
    );
}

PrivateRouter.propTypes = {
    Component: propTypes.func
};
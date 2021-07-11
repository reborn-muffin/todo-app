import propTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { currentUserSelector } from '../selectors/authSelectors'

export default function PrivateRouter({ component: Component, ...rest }){
    const currentUser = useSelector(currentUserSelector);

    return (
        <>
            {(currentUser !== undefined) ? <Route {...rest} render={props => <Component {...props}/>} /> : <Redirect to='/login' />}
        </>
    );
}

PrivateRouter.propTypes = {
    Component: propTypes.func
};
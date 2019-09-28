import WithSchoolSiteService from '../hoc/with-schoolsite-service-context';
import { withRouter } from 'react-router-dom';
import { handleLogout } from '../../actions';
import store from '../../store';

const Logout = ({ schoolSiteService, history }) => {
    schoolSiteService.clearJWT();
    store.dispatch(handleLogout());
    history.push('/');
    return false;
};

export default withRouter(WithSchoolSiteService(Logout));

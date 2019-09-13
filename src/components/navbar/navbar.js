import React, { Fragment, Suspense } from 'react';
import NavElement from './nav-element';
import { connect } from 'react-redux';
import './navbar.css';
import { WithSchoolSiteService } from '../hoc';
import Spinner from '../spinner/spinner';
//import DropDownAuthMenu from './DropDownAuthMenu.js';

const NavBarToggler = () => {
    return (
        <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
        >
            <span className='navbar-toggler-icon'></span>
        </button>
    );
};

class NavBar extends React.PureComponent {
    state = {
        mainMenu: [],
        isLoaded: false,
    };
    constructor(props) {
        super(props);
        this.DropDownAuthMenu = React.lazy(() =>
            import('./drop-down-auth-menu.js'),
        );
    }

    handleButtonClick = () => {
        window.location.href = this.props.loginMenu.signInHref;
    };

    componentDidMount() {
        const { schoolSiteService } = this.props;
        schoolSiteService.getNavBar().then(mainMenu => {
            this.setState(state => ({ mainMenu: mainMenu }));
            this.setState(state => ({ isLoaded: true }));
        });
    }

    render() {
        const { loginMenu } = this.props;
        const mainMenu = this.state.mainMenu;
        const DropDownAuthMenu = this.DropDownAuthMenu;
        if (this.state.isLoaded) {
            const NavElements = mainMenu.map(data => (
                <NavElement
                    key={data.id}
                    id={data.id}
                    href={data.href}
                    name={data.name}
                    submenu={data.submenu}
                />
            ));
            return (
                <Fragment>
                    <nav
                        className='navbar navbar-expand-lg navbar-light bg-light'
                        id='Menu'
                    >
                        <NavBarToggler />
                        <div
                            className='collapse navbar-collapse'
                            id='navbarSupportedContent'
                        >
                            <ul className='navbar-nav mr-auto'>
                                {NavElements}
                            </ul>
                            <div className='btn-group show-menu'>
                                <button
                                    type='button'
                                    className='btn btn-secondary dropdown-toggle'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                    onClick={this.handleButtonClick}
                                >
                                    {loginMenu.signin}
                                </button>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <DropDownAuthMenu />
                                </Suspense>
                            </div>
                        </div>
                    </nav>
                </Fragment>
            );
        }
        return <Spinner />;
    }
}

const mapStateToPropsNavBar = ({ loginMenu }) => {
    return { loginMenu };
};
export default WithSchoolSiteService(connect(mapStateToPropsNavBar)(NavBar));

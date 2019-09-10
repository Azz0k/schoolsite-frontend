import React, { Fragment, Suspense } from 'react';
import NavElement from './nav-element';
import { connect } from 'react-redux';
import './navbar.css';
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
    constructor(props) {
        super(props);
        this.DropDownAuthMenu = React.lazy(() =>
            import('./drop-down-auth-menu.js'),
        );
    }
    render() {
        let { mainMenu, loginMenu } = this.props;
        let DropDownAuthMenu = this.DropDownAuthMenu;
        let NavElements = mainMenu.map(data => (
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
                        className='collapse navbar-collapse '
                        id='navbarSupportedContent'
                    >
                        <ul className='navbar-nav mr-auto'>{NavElements}</ul>
                        <div className='btn-group'>
                            <button
                                type='button'
                                className='btn btn-secondary dropdown-toggle'
                                data-toggle='dropdown'
                                aria-haspopup='true'
                                aria-expanded='false'
                            >
                                {loginMenu.signin}
                            </button>
                            <Suspense fallback={<div>Loading...</div>}>
                                <DropDownAuthMenu {...this.props} />
                            </Suspense>
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    }
}

const mapStateToProps = ({
    isAuthorized,
    isRememberChecked,
    mainMenu,
    adminMenu,
    loginMenu,
}) => {
    return {
        isAuthorized,
        isRememberChecked,
        mainMenu,
        adminMenu,
        loginMenu,
    };
};
export default connect(mapStateToProps)(NavBar);

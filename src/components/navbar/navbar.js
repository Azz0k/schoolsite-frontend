import React, { Fragment, Suspense } from 'react';
import NavElement from './nav-element';
import { connect } from 'react-redux';
import './navbar.css';
import { WithSchoolSiteService } from '../hoc';
import { mainMenuLoaded } from '../../actions';
import SpinnerBoundary from '../spinner/spinner-boundary';

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

const NavView = props => {
    const {
        NavElements,
        loginMenu,
        handleButtonClick,
        DropDownAuthMenu,
    } = props;
    return (
        <React.Fragment>
            <NavBarToggler />
            <div
                className='collapse navbar-collapse'
                id='navbarSupportedContent'
            >
                <ul className='navbar-nav mr-auto'>{NavElements}</ul>
                <div className='btn-group show-menu'>
                    <button
                        type='button'
                        className='btn btn-secondary dropdown-toggle'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                        onClick={handleButtonClick}
                    >
                        {loginMenu.signin}
                    </button>
                    <Suspense fallback={<div>Loading...</div>}>
                        <DropDownAuthMenu />
                    </Suspense>
                </div>
            </div>
        </React.Fragment>
    );
};

class NavBar extends React.PureComponent {
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
        const { schoolSiteService, mainMenu } = this.props;
        if (!mainMenu.isLoaded) {
            schoolSiteService.getNavBar().then(mainMenu => {
                this.props.mainMenuLoaded(mainMenu);
            });
        }
    }

    render() {
        const { loginMenu, mainMenu } = this.props;
        const DropDownAuthMenu = this.DropDownAuthMenu;
        let NavElements;
        if (mainMenu.isLoaded) {
            NavElements = mainMenu.value.map(data => (
                <NavElement
                    key={data.id}
                    id={data.id}
                    href={data.href}
                    name={data.name}
                    submenu={data.submenu}
                />
            ));
        }
        return (
            <Fragment>
                <nav
                    className='navbar navbar-expand-lg navbar-light bg-light'
                    id='Menu'
                >
                    <SpinnerBoundary isLoaded={mainMenu.isLoaded}>
                        <NavView
                            NavElements={NavElements}
                            DropDownAuthMenu={DropDownAuthMenu}
                            loginMenu={loginMenu}
                            handleButtonClick={this.handleButtonClick}
                        />
                    </SpinnerBoundary>
                </nav>
            </Fragment>
        );
    }
}

const mapStateToPropsNavBar = ({ loginMenu, mainMenu }) => {
    return { loginMenu, mainMenu };
};

export default WithSchoolSiteService(
    connect(
        mapStateToPropsNavBar,
        { mainMenuLoaded },
    )(NavBar),
);

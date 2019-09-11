import React from 'react';

export class ChildElement extends React.PureComponent {
    render() {
        return (
            <a className='dropdown-item' href={this.props.href}>
                {this.props.name}
            </a>
        );
    }
}

export default class NavElement extends React.PureComponent {
    SingeElement() {
        return (
            <li className='nav-item'>
                <a className='nav-link' href={this.props.href}>
                    {this.props.name}
                </a>
            </li>
        );
    }

    CreateChildElements(submenu) {
        let result = [];
        for (let i = 0; i < submenu.length; i++) {
            if (submenu[i].submenu.length === 0)
                result.push(
                    <ChildElement
                        key={submenu[i].id}
                        href={submenu[i].href}
                        name={submenu[i].name}
                    />,
                );
            else {
                let temp = this.CreateChildElements(submenu[i].submenu);
                result.push(
                    <li
                        className='nav-item dropdown-submenu'
                        key={submenu[i].id}
                    >
                        <a className='dropdown-item' href={submenu[i].href}>
                            {submenu[i].name}
                        </a>
                        <ul className='dropdown-menu'>{temp}</ul>
                    </li>,
                );
            }
        }
        return result;
    }

    DropDownElement() {
        let ChildElements = this.CreateChildElements(this.props.submenu);
        return (
            <li className='nav-item dropdown'>
                <a
                    className='nav-link dropdown-toggle'
                    href={this.props.href}
                    id={this.props.id}
                >
                    {this.props.name}
                </a>
                <ul className='dropdown-menu'>{ChildElements}</ul>
            </li>
        );
    }
    render() {
        if (this.props.submenu.length === 0) return this.SingeElement();
        else {
            return this.DropDownElement();
        }
    }
}

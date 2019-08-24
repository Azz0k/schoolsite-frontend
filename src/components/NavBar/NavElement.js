import React from 'react';

class ChildElement extends React.PureComponent{
    constructor(props) {
        super(props);
    }
    render() {

            return(

                <a className="dropdown-item" href={this.props.href}>{this.props.name}</a>
            )
        }

}
class NavElement extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={}
    }
    SingeElement(){
        return (
            <li className="nav-item">
                <a className="nav-link" href={this.props.href}>{this.props.name}</a>
            </li>
        )
    }

    DropDownElement(){
        let ChildElements=this.props.children.map(data=><ChildElement key={'child'+data.id} href={data.href} name={data.name}/>)

        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href={this.props.href} id={"navbarDropdown"+this.props.id} role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.name}
                </a>
                <div className="dropdown-menu" aria-labelledby={"navbarDropdown"+this.props.id}>
                    {ChildElements}
                </div>
            </li>
        )
    }
    render() {
        if (this.props.children.length===0)
            return this.SingeElement();
        else {
            return this.DropDownElement();
        }
    }
}
export default NavElement;
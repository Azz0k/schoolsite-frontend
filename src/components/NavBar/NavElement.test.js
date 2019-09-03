import React from 'react';
import {shallow} from 'enzyme';
import NavElement, {ChildElement} from "./NavElement";
import TestMainMenu from "../SiteState/TestMainMenu";
test('ChildElement render',() =>{
    const wrapper = shallow(<ChildElement href="href" name="name"/>);
    expect(wrapper.matchesElement(<a className="dropdown-item" href="href">name</a>)).toEqual(true);

});

test('NavElement render', () => {
    for (let i=0;i< TestMainMenu.length;i++){
        let data = TestMainMenu[i];
        let wrapper = shallow(<NavElement key={data.id} id={data.id} href={data.href} name={data.name} submenu={data.submenu}/>);
        expect(wrapper.find(data.id)).toHaveLength(1);
    }

});
import React, { Component, PropTypes } from 'react';
import NavLink from './NavLink.jsx';

export default class DropdownMenu extends Component {
    initDropdownMenu() {
        const DropDown = new Foundation.DropdownMenu($('.dropdown'));
    }

    componentDidMount() {
        this.initDropdownMenu();
    }

    componentDidUpdate() {
        this.initDropdownMenu();
    }

    render() {
        let hasSubmenuClass = '';
        let subItems = [];

        const items = this.props.menuItems.map((item, idx) => {
            hasSubmenuClass = '';
            subItems = [];
            if (item.subItems) {
                hasSubmenuClass = 'has-submenu';
                subItems = item.subItems.map((subItem, subIdx) => {
                    return (
                        <li key={subIdx} className={subItem.className}>
                            <NavLink to={subItem.path} onClick={subItem.onClick}>{subItem.title}</NavLink>
                        </li>
                    );
                });
            }

            return (
                <li key={idx} className={`${hasSubmenuClass} ${item.className}`}>
                    <NavLink to={item.path} onClick={item.onClick}>{item.title}</NavLink>
                    {subItems.length > 0 &&
                    <ul className="menu submenu vertical">
                        {subItems}
                    </ul>
                    }
                </li>
            );
        });

        return (
            <ul className="horizontal dropdown menu" data-dropdown-menu data-closing-time="250" role="tablist"
                aria-multiselectable="true">
                {items}
            </ul>
        );
    }
}

DropdownMenu.propTypes = {
    menuItems: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object
};

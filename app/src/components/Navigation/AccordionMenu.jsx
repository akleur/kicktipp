import React, { Component, PropTypes } from 'react';
import NavLink from './NavLink.jsx';

export default class AccordionMenu extends Component {
    initAccordionMenu() {
        const accordion = new Foundation.AccordionMenu($('.accordion-menu'));
    }

    componentDidMount() {
        this.initAccordionMenu();
    }

    componentDidUpdate() {
        this.initAccordionMenu();
    }

    render() {
        let hasSubmenuClass = '';
        let subItems = [];
        const { menuItems, menuPrefix } = this.props;

        const items = menuItems.map((item, idx) => {
            hasSubmenuClass = '';
            subItems = [];
            if (item.subItems && item.subItems.length > 0) {
                hasSubmenuClass = 'has-submenu';
                subItems = item.subItems.map((subItem, subIdx) => {
                    return (
                        <li key={`${menuPrefix}-sub-${subIdx}`} className={subItem.className}>
                            <NavLink to={subItem.path} onClick={subItem.onClick}>{subItem.title}</NavLink>
                        </li>
                    );
                });
            }

            return (
                <li key={`${menuPrefix}-${idx}`} className={`${hasSubmenuClass} ${item.className}`}>
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
            <ul className="vertical accordion-menu menu" data-accordion-menu role="tablist" aria-multiselectable="true">
                {items}
            </ul>
        );
    }
}

AccordionMenu.propTypes = {
    menuItems: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object
};

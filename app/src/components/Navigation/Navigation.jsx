import React, { Component, PropTypes } from 'react';
import DropdownMenu from './DropdownMenu.jsx';
import AccordionMenu from './AccordionMenu.jsx';

export default class Navigation extends Component {
    render() {
        return (
            <div className="navi">
                <div className="title-logo-wrapper">
                    <div className="title-logo"><img src="../../imgs/kicktipp2016.svg" alt="kicktipp_logo"
                                                     width="100%"/></div>
                </div>
                <div className="title-bar hide-for-large" data-responsive-toggle="widemenu" data-hide-for="large">
                    <div className="title-bar-left hide-for-medium" data-hide-for="medium">
                        <button className="menu-icon" type="button" data-toggle="offCanvasLeft"></button>
                        <span className="title-bar-title">Kicktipp</span>
                    </div>
                    <div className="title-bar-right hide-for-large" data-hide-for="large">
                        <span className="title-bar-title">User</span>
                        <button className="menu-icon" type="button" data-toggle="offCanvasRight"></button>
                    </div>
                </div>
                <div className="off-canvas position-left" id="offCanvasLeft" data-off-canvas>
                    <AccordionMenu menuItems={this.props.menuItemsLeft} menuPrefix="acco-l"
                                   isAuthenticated={this.props.isAuthenticated} currentUser={this.props.currentUser}/>
                </div>
                <div className="off-canvas position-right" id="offCanvasRight" data-off-canvas data-position="right">
                    <AccordionMenu menuItems={this.props.menuItemsRight} menuPrefix="acco-r"
                                   isAuthenticated={this.props.isAuthenticated} currentUser={this.props.currentUser}/>
                </div>
                <div id="widemenu" className="top-bar hide-for-small" data-hide-for="small">
                    <div className="top-bar-left show-for-medium opens-left" data-show-for="medium">
                        <DropdownMenu menuItems={this.props.menuItemsLeft} isAuthenticated={this.props.isAuthenticated}
                                      currentUser={this.props.currentUser}/>
                    </div>
                    <div className="top-bar-right show-for-large opens-right" data-show-for="large">
                        <DropdownMenu menuItems={this.props.menuItemsRight} isAuthenticated={this.props.isAuthenticated}
                                      currentUser={this.props.currentUser}/>
                    </div>
                </div>
            </div>
        );
    }
}

Navigation.propTypes = {
    menuItemsLeft: PropTypes.array.isRequired,
    menuItemsRight: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
};

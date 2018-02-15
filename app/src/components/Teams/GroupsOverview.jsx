import React, { Component, PropTypes } from 'react';
import GroupTable from './GroupTable.jsx';

export default class GroupsOverview extends Component {
    render() {
        const { groups } = this.props;

        return (
            <div>
                <h1 className="align-center">Gruppen Tabelle</h1>
                <div className="long-table">
                    {groups.items.map((group, idx) => {
                        return (
                            <div key={idx} className="row">
                                <div className="small-12 large-12">
                                    <GroupTable group={group}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

GroupsOverview.propTypes = {
    groups: PropTypes.object.isRequired
};

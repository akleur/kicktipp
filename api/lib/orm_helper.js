function ORMHelper() {
    this.buildSimpleJoinQuery = (options) => {
        const {
            visibleFields,
            tableAlias,
            relatedFields,
            relatedFieldId,
            relatedTable,
            table
        } = options;
        const aliasedFields = visibleFields.map(field => `${tableAlias}.${field}`);
        const aliasedRelatedFields = relatedFields.map(field => `${relatedTable.alias}.${field.field} AS ${field.alias}`);

        const allAliasedFields = aliasedFields.concat(aliasedRelatedFields);

        const qSel = `SELECT ${allAliasedFields.join(',')}`;
        const qFrom = ` FROM ${table} ${tableAlias}, ${relatedTable.name} ${relatedTable.alias}`;
        const qWhere = ` WHERE ${tableAlias}.${relatedFieldId} = ${relatedTable.alias}.id`;

        return qSel + qFrom + qWhere;
    };
}

module.exports = new ORMHelper();

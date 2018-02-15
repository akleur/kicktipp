function dynamicSort(propertyToSort) {
    let property = propertyToSort;
    let sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a, b) => {
        if (typeof a[property] === 'string') {
            a[property] = a[property].toLowerCase();
        }
        if (typeof b[property] === 'string') {
            b[property] = b[property].toLowerCase();
        }
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}

export default function dynamicSortMultiple(...props) {
    return (obj1, obj2) => {
        let i = 0;
        let result = 0;
        const numberOfProperties = props.length;
        while (result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    };
}

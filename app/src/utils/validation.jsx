const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */];

export function email(value) {
    if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Email Adresse ungültig';
    }
    return '';
}

export function required(value) {
    if (isEmpty(value)) {
        return 'Pflichtfeld';
    }
    return '';
}

export function minLength(min) {
    return (value) => {
        if (!isEmpty(value) && value.toString().length < min) {
            return `Muss mindestens ${min} Zeichen beinhalten`;
        }
        return '';
    };
}

export function maxLength(max) {
    return (value) => {
        if (!isEmpty(value) && value.toString().length > max) {
            return `Muss nicht mehr als ${max} Zeichen beinhalten`;
        }
        return '';
    };
}

export function integer(value) {
    if (!isEmpty(value) && !Number.isInteger(Number(value))) {
        return 'Muss eine Ganzzahl sein';
    }
    return '';
}

export function oneOf(enumeration) {
    return (value) => {
        if (!~enumeration.indexOf(value)) {
            return `Muss eine von: ${enumeration.join(', ')} sein`;
        }
        return '';
    };
}

export function match(field) {
    return (value, data) => {
        if (data && value !== data[field]) {
            return 'Stimmt nicht überein';
        }
        return '';
    };
}

export function createValidator(rules) {
    return (data = {}) => {
        const errors = {};
        Object.keys(rules).forEach((key) => {
            const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
            const error = rule(data[key], data);
            if (error) {
                errors[key] = error;
            }
        });
        return errors;
    };
}

export function createValidatorWithData(data, rules) {
    const errors = {};
    Object.keys(rules).forEach((key) => {
        const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
        const error = rule(data[key], data);
        if (error) {
            errors[key] = error;
            errors._error = 'hello there';
        }
    });
    return errors;
}

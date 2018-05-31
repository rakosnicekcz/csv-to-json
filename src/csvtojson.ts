
export const csvToJson = (csvText, delimiter = findDelimiter(csvText)) => {
    const rows = rowsSpliter(csvText);
    return rowsRider(rows, delimiter);
};

export const rowsSpliter = (csvText) => {
    return csvText.split(/[\r\n]+/).filter((v) => {
        return v;
    });
};

export const findDelimiter = (csvText) => {
    const index = csvText.search(/[,;| ]/);
    return csvText[index];
};

export const rowsRider = (rows, delimiter) => {
    const fields = rows[0].split(delimiter);
    const objArray: any = [];
    for (let i = 1, len = rows.length; i < len; i++) {
        const row = rows[i] += delimiter;
        objArray.push(charRider(row, fields, delimiter));
    }
    return objArray;
};

export const charRider = (row, fields, delimiter) => {
    let castedValue = '';
    let stringDetection = 0;
    const obj = {};
    let indexCalculator = 0;
    for (const char of row) {
        if (char === '"') {
            if (stringDetection === 2) {
                stringDetection--;
                castedValue += char;
                continue;
            }
            stringDetection++;
            continue;
        }
        if (char === delimiter && (stringDetection === 0 || stringDetection === 2)) {
            obj[fields[indexCalculator]] = getCastedValue(castedValue);
            castedValue = '';
            indexCalculator++;
            stringDetection = 0;
        } else {
            castedValue += char;
        }

    }
    return obj;
};

export const getCastedValue = (value) => {
    return value === '' ? null : isNaN(value) ? value : +value;
};


export const csvToJson = (csvText: string, delimiter: any = findDelimiter(csvText)) => {
    const rows = rowsSpliter(csvText);
    return rowsRider(rows, delimiter);
};

export const rowsSpliter = (csvText: any) => {
    return csvText.split(/[\r\n]+/).filter((v: any) => {
        return v;
    });
};

export const findDelimiter = (csvText: any) => {
    const index = csvText.search(/[,;| ]/);
    return csvText[index];
};

export const rowsRider = (rows: any, delimiter: any) => {
    const fields = rows[0].split(delimiter);
    const objArray = [];
    for (let i = 1, len = rows.length; i < len; i++) {
        objArray.push(charRider(rows[i] += delimiter, fields, delimiter));
    }
    return objArray;
};

export const charRider = (row: any, fields: any, delimiter: any) => {
    let castedValue: any = '';
    let stringDetection = 0;
    const obj: any = {};
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

export const getCastedValue = (value: any) => {
    return value === '' ? null : isNaN(value) ? value : +value;
};

import {tableStructure} from "../types";

export const areEqualArray = (array1: string[], array2: string[]) => {
	array1 = array1.sort();
	array2 = array2.sort();
	if (array1.length === array2.length) {
		return array1.every((val, index) => val === array2[index]);
	}

	return false;
};

export const checkValidationSchema = (
	table: tableStructure,
	incomingData: {[key: string]: string},
): boolean => {
	const {tableSchema} = table;
	const keysTableSchema = Object.keys(tableSchema);

	const result = keysTableSchema.map((i, key) => {
		const type = tableSchema[keysTableSchema[key]];
		const value = incomingData[keysTableSchema[key]];

		switch (type) {
			case "string":
				return true;

			case "number":
				return /^\d+$/.test(value);
		}
	});

	return result.filter((i) => i === false).length === 0;
};

export const areEqualArray = (array1: string[], array2: string[]) => {
	array1 = array1.sort();
	array2 = array2.sort();
	if (array1.length === array2.length) {
		return array1.every((val, index) => val === array2[index]);
	}

	return false;
};

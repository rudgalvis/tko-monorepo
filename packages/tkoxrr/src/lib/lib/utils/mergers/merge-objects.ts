export const mergeObjects = (
	target: Record<string, any>,
	source: Record<string, any>,
	matchKey: string
): Record<string, any> => {
	for (const key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
				if (!target[key]) {
					target[key] = {};
				}
				if (source[key][matchKey] === target[key][matchKey]) {
					mergeObjects(target[key], source[key], matchKey);
				}
			} else {
				target[key] = source[key];
			}
		}
	}
	return target;
};

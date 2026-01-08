/**
 * Resolves a value that can be static or derived dynamically through a function.
 *
 * @param value - The value to resolve, which can be static or a function.
 * @param param - The parameter to pass if the value is a function.
 *
 * @returns The resolved value.
 */
export const resolveValue = <T, P>(
	value: T | ((param: P) => T),
	param: P,
): T => {
	return typeof value === "function"
		? (value as (param: P) => T)(param)
		: value;
};

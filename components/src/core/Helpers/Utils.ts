/**
 * Interleave function
 *
 * This function is used to interleave a 'separator' element between the items of an array.
 *
 * @param array An array of initial elements
 * @param separator The separator to inject between all array elements
 * @returns a new array with a separator inserted between each of the original items
 */
export const interleave = <TElement, TSeparator>(
    array: TElement[],
    separator: () => TSeparator
): Array<TSeparator | TElement> => {
    const output: Array<TSeparator | TElement> = [];

    array.forEach((element, index) => {
        if (index) {
            output.push(separator());
        }

        output.push(element);
    });

    return output;
};

export type LabeledArrays<T> = { [label: string]: T[] };

/**
 * groupBy function
 *
 * This function is used to group items from a flat list into buckets
 *
 * @param getGroup A function that takes an item and returns the group that it should belong to as a string
 * @param array The array of elements to group
 * @returns An object whose keys are the groups and values are the elements from the original array who belong in that bucket
 */
export const groupBy = <T>(getGroup: (data: T) => string, array: T[]): LabeledArrays<T> => {
    const groups: LabeledArrays<T> = {};

    array.forEach((element) => {
        const label = getGroup(element);

        if (groups[label]) {
            groups[label].push(element);
        } else {
            groups[label] = [element];
        }
    });

    return groups;
};

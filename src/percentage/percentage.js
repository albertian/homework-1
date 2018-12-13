/**
 * Get percentage values of each array number of total amount
 * @param {Array.<Number>} arr - array of numbers
 * @returns {Array.<String>}
 */
export default function calculatePercentages(arr) {
    if (!arr || !Array.isArray(arr)) {
        return;
    }
    const sum = arr.reduce((sum, x) => +x + sum, 0);
    return arr.map(x => (x * 100 / sum).toFixed(3));
};

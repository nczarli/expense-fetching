/**
 * Capitalizes the first letter of each word in a string.
 * 
 * @param str - The input string (e.g., "hello world").
 * @returns The string with each word capitalized (e.g., "Hello World").
 */
const capitalizeWords = (str: string): string =>
    /**
     * Regex Explanation:
     * \b  - Matches a word boundary (ensures we're at the start of a word).
     * \w  - Matches the first letter of the word (any alphanumeric character).
     * g   - Global flag to replace all occurrences in the string.
     */
    str.replace(/\b\w/g, (char) => char.toUpperCase());
  
/**
 * Formats an ISO date string into a human-readable format.
 * 
 * @param isoString - The ISO date string (e.g., "2024-10-16T07:43:00.214Z").
 * @returns The formatted date string in the format "08:43 - 16/10/2024".
 */
const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
};

export { capitalizeWords, formatDate };

/**
 * Truncates a given text if it exceeds the specified maximum length and appends an ellipsis ("...").
 *
 * @param {string} txt - The input text to be truncated.
 * @param {number} [max=50] - The maximum allowed length of the text before truncation.
 * @returns {string} The truncated text with an ellipsis if it exceeds the max length; otherwise, the original text.
 */
export const txtSlicer = (txt: string, max: number = 50): string => {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  return txt;
};

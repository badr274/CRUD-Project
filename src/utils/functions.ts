/**
 * Truncates a given text to a specified maximum length.
 *
 * @param {string} txt - The input text to be truncated.
 * @param {number} [max=50] - The maximum allowed length of the text. Defaults to 50.
 * @returns {string} - The truncated text if it exceeds the maximum length; otherwise, the original text.
 */

export const sliceTxt = (txt: string, max: number = 50): string => {
  return txt.length > max ? `${txt.slice(0, max)}...` : txt;
};

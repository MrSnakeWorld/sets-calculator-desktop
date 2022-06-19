/**
 * Объединение
 * Возвращает множество состоящее из всех элементов, принадлежащих хотя бы одному из множеств A и B
 *
 * @param A - Множество A
 * @param B - Множество B
 * @returns Множество C
 */
export default (A: Set<unknown>, B: Set<unknown>): Set<unknown> =>
	new Set([...A, ...B]);

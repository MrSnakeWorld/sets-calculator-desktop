/**
 * Разность
 * Возвращает множество, элементы которого являются элементами множества A, которые не принадлежат множеству B
 *
 * @param A - Множество A
 * @param B - Множество B
 * @return Множество C
 */
export default (A: Set<unknown>, B: Set<unknown>): Set<unknown> =>
	new Set([...A].filter(x => !B.has(x)));

/**
 * Проверка на подмножество
 * Возвращает true, если множество A является подмножеством B
 *
 * @param A - множество A
 * @param B - множество B
 * @returns boolean
 */
export default (A: Set<unknown>, B: Set<unknown>): boolean =>
	[...A].every(x => B.has(x));

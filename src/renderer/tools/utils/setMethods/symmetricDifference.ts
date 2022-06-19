import difference from './difference';
import union from './union';

/**
 * Симметрическая разность
 * Возвращает множество состоящее из элементов, которые принадлежат одному из множеств: A или B, но не являются общими элементами
 *
 * @param A - Множество A
 * @param B - Множество B
 * @returns Множество C
 */
export default (A: Set<unknown>, B: Set<unknown>): Set<unknown> =>
	new Set([...union(difference(A, B), difference(B, A))]);

/**
 * Генератор случайного уникального значения
 * @returns уникальное значение
 */
export default (): string => '_' + Math.random().toString(36).substring(2, 9);

import {IMicroInput} from '../../interfaces/IMicroInput';
import {IMicroInputType} from '../../types/IMicroInputType';
import difference from '../setMethods/difference';
import intersection from '../setMethods/intersection';
import symmetricDifference from '../setMethods/symmetricDifference';
import union from '../setMethods/union';

enum operations {
	'|' = '|',
	'&' = '&',
	'/' = '/',
	'-' = '-',
	'(' = '(',
	')' = ')',
	'[' = '[',
	']' = ']'
}

const priority: Record<operations, number> = {
	'|': 1,
	'&': 1,
	'/': 1,
	'-': 1,
	'(': 0,
	')': 0,
	']': 0,
	'[': 0
};

interface IQueue {
	value: string;
	type: IMicroInputType;
}

export class ParseSets {
	private _stack: operations[] = [];
	private _queue: IQueue[] = [];

	constructor() {
		//do nothing;
	}

	public eval(microInputs: IMicroInput[]) {
		const queue = this.parse(microInputs);
		const answer = this.calc(queue);

		return answer;
	}

	public calc(queue: IQueue[]): string {
		const stack: string[] = [];
		const operations = [], names = [];
		
		for (const op of queue) {
			switch (op.type) {
			case IMicroInputType.NAME: {
				stack.push(op.value);
				names.push(op.value);
				break;
			}
			case IMicroInputType.OPERATION: {
				const second = stack.pop() || '';
				const first = stack.pop() || '';

				const answer = this.execute(op.value as operations, first, second);

				operations.push(op.value);
				stack.push(answer);
				break;
			}
			}
		}
		
		if (operations.length === names.length - 1) {
			return stack[0];
		} else {
			throw new Error('Невозможно вычислить выражение');
		}
	}

	private execute(char: operations, first: string, second: string): string {
		const firstSet = new Set(JSON.parse(first)),
			secondSet = new Set(JSON.parse(second));
		switch (char) {
		case operations['&']: {
			const answer = union(firstSet, secondSet);
			return JSON.stringify(Array.from(answer));
		}
		case operations['|']: {
			const answer = intersection(firstSet, secondSet);
			return JSON.stringify(Array.from(answer));
		}
		case operations['-']: {
			const answer = difference(firstSet, secondSet);
			return JSON.stringify(Array.from(answer));
		}
		case operations['/']: {
			const answer = symmetricDifference(firstSet, secondSet);
			return JSON.stringify(Array.from(answer));
		}
		default: {
			throw new Error('Неизвестный тип операции');
		}
		}
	}

	public parse(microInputs: IMicroInput[]) {
		for (const microInput of microInputs) {
			this.process(microInput);
		}
		return this.getResult();
	}

	private process(microInput: IMicroInput) {
		const {type, value} = microInput;
		if (value) {
			switch (type) {
			case IMicroInputType.NAME: {
				this.storeOperand(value, type);
				break;
			}
			case IMicroInputType.OPERATION:
			case IMicroInputType.DEGREE: {
				this.pushOperator(value as operations, type);
				break;
			}
			case IMicroInputType.START_BRACKET:
			case IMicroInputType.START_ADD_BRACKET: {
				this.pushOpeningBracket();
				break;
			}
			case IMicroInputType.END_BRACKET:
			case IMicroInputType.END_ADD_BRACKET: {
				this.pushClosingBracket();
				break;
			}
			default: {
				throw new Error('Неизвестный тип значения');
			}
			}		
		} else {
			throw new Error('Не задано значение');
		}
	}

	private storeOperand(value: string, type: IMicroInputType) {
		this._queue.push({value, type});
	}

	private pushOperator(operator: operations, type: IMicroInputType) {
		const operatorPriority = priority[operator];
		
		while (this._stack.length) {
			const lastIndex = this._stack.length - 1;

			const stackOperator = this._stack[lastIndex];

			if (stackOperator === operations['('] || stackOperator === operations['[']) {
				break;
			}

			const stackOperatorPriority = priority[stackOperator];
			if (stackOperatorPriority < operatorPriority) {
				break;
			}

			this._queue.push({value: this._stack.pop() || '', type});
		}

		this._stack.push(operator);
	}

	private pushOpeningBracket() {
		this._stack.push(operations['(']);
	}

	private pushClosingBracket() {
		let isFound = false;

		while (this._stack.length) {
			const stackOperator = this._stack.pop();
			if (stackOperator === operations['(']) {
				isFound = true;
				break;
			}

			this._queue.push({value: stackOperator || '', type: IMicroInputType.OPERATION});
		}

		if (!isFound) {
			throw new Error('Не найдена открывающаяся скобка');
		}
	}

	private getResult() {
		while (this._stack.length) {
			this._queue.push({value: this._stack.pop() || '', type: IMicroInputType.OPERATION});
		}
		const queue = this._queue;
		this.clear();

		return queue;
	}

	private clear() {
		this._queue = [];
		this._stack = [];
	}
}

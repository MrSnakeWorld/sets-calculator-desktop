import {IMicroInput} from '../../interfaces/IMicroInput';
import {IMicroInputType} from '../../types/IMicroInputType';

enum operations {
	'*' = '*',
	'/' = '/',
	'+' = '+',
	'-' = '-',
	'^' = '^',
	'(' = '(',
	')' = ')',
	'[' = '[',
	']' = ']'
}

const priority: Record<operations, number> = {
	'*': 2,
	'/': 2,
	'+': 1,
	'-': 1,
	'^': 3,
	'(': 0,
	')': 0,
	']': 0,
	'[': 0
};

interface IQueue {
	value: string;
	type: IMicroInputType;
}

export class ParseValues {
	private _stack: operations[] = [];
	private _queue: IQueue[] = [];

	constructor() {
		//do nothing;
	}

	public eval(microInputs: IMicroInput[]) {
		const answers: Set<number> = new Set();
		const blocks: IMicroInput[][] = [];
		let block: IMicroInput[] = [];

		for (const microInput of microInputs) {
			if (microInput.type === IMicroInputType.SEPARATOR) {
				blocks.push(block);
				block = [];
			} else {
				block.push(microInput);
			}
		}

		if (block.length) {
			blocks.push(block);
		}

		blocks.forEach((val) => {
			const queue = this.parse(val);
			const answer = this.calc(queue);

			if (isNaN(answer)) {
				throw new Error('Не удалось вычислить выражение');
			}

			answers.add(answer);
		});

		return answers;
	}

	public calc(queue: IQueue[]): number {
		const stack = [];
		const operations = [], values = [];

		for (const op of queue) {
			switch (op.type) {
			case IMicroInputType.VALUE: {
				stack.push(op.value);
				values.push(op.value);
				break;
			}
			case IMicroInputType.OPERATION: {
				const second = Number(stack.pop());
				const first = Number(stack.pop());

				const answer = this.execute(op.value as operations, first, second);

				operations.push(op.value);
				stack.push(answer);
				break;
			}
			}
		}

		if (operations.length === values.length - 1){
			return Number(stack[0]);
		} else {
			throw new Error('Невозможно вычислить выражение');
		}
	}

	private execute(char: operations, first: number, second: number): number {
		switch (char) {
		case operations['+']: {
			return first + second;
		}
		case operations['-']: {
			return first - second;
		}
		case operations['*']: {
			return first * second;
		}
		case operations['/']: {
			return first / second;
		}
		case operations['^']: {
			return Math.pow(first, second);
		}
		default: {
			throw new Error('Неизвестный тип операции');
		}
		}
	}

	public parse(tokens: IToken[]) {
		for (const token of tokens) {
			this.process(token);
		}
		return this.getResult();
	}

	private process(microInput: IMicroInput) {
		const {type, value} = microInput;
		if (value) {
			switch (type) {
			case IMicroInputType.VALUE: {
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

	private storeOperand(value: string, type: IToken) {
		this._queue.push({value, type});
	}

	private pushOperator(operator: operations, type: IToken) {
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

			this._queue.push({value: stackOperator || '', type: ITokenType.OPERATION});
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

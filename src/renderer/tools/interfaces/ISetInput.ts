import IInput from './IInput';

export interface ISetInput {
  id: string;
  setName: IInput;
  setValue: IInput;
	prevName?: string;
	name?: string;
	value?: string;
	parsedValue?: number[];
	isValid?: boolean;
}

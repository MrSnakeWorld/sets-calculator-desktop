import {IMicroInput} from './IMicroInput';

export default interface IInput {
  microInputs: IMicroInputsState;
  value?: string;
  maxLength?: number;
}

export interface IFixedInput {
  microInputs: IMicroInput[];
  value?: string;
  maxLength?: number;
}

export interface IMicroInputsState {
  byId: {
    [id: string]: IMicroInput;
  };
  allIds: string[];
}

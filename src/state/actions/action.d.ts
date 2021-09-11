import { AnyAction } from "redux";

export interface ActionConfig extends AnyAction {
  payload?: any;
  meta?: any;
  error?: any;
}
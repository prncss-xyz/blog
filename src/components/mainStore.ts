import { optic } from "optics-ts";
import { createHooks } from "./stores";
import { create } from "zustand";

export interface ISlide {
  ref: React.RefObject<HTMLDivElement>;
}

export interface IState {
  slide: number;
  slides: ISlide[];
}

export const state = optic<IState>();

export const initSamples = {};

export const init: IState = {
  slide: 0,
  slides: [],
};

const useBoundStore = create(() => init);
export const useMainStore = createHooks(useBoundStore);

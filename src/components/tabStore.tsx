import { optic } from "optics-ts";
import { createHooks } from "./stores";
import { create } from "zustand";

type Mode = "SHOW" | "SPEAK" | "READ";

export interface ITabState {
  mode: Mode;
}

export const tabState= optic<ITabState>();

export const init: ITabState = {
  mode: "READ",
};

const useBoundStore = create(() => init);
export const useTabStore = createHooks(useBoundStore);

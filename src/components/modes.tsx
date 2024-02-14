import { ReactNode } from "react";
import { tabState, useTabStore } from "./tabStore";

export function Speak({ children }: { children: ReactNode }) {
  if (useTabStore.get(tabState.prop("mode")) !== "SPEAK") return null;
  return children;
}

export function Read({ children }: { children: ReactNode }) {
  if (useTabStore.get(tabState.prop("mode")) !== "READ") return null;
  return children;
}

export function Show({ children }: { children: ReactNode }) {
  if (useTabStore.get(tabState.prop("mode")) !== "SHOW") return null;
  return children;
}

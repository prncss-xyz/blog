import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useCallback,
} from "react";
import { Box, HStack, VStack } from "@/../styled-system/jsx";

function Label({ name }: { name?: string }) {
  return (
    name !== undefined && (
      <HStack gap={1}>
        <Box color="blue">{name}</Box>
        <Box>:</Box>
      </HStack>
    )
  );
}

function Json({
  name,
  value,
  first,
}: {
  name?: string;
  value: unknown;
  first?: boolean;
}) {
  if (name === undefined && value === undefined) {
    return (
      <Box color="yellow" fontStyle="italic">
        undefined
      </Box>
    );
  }
  if (value === null || typeof value !== "object") {
    return (
      <HStack gap={3}>
        <Label name={name} />
        <Box color="red">{JSON.stringify(value)} </Box>
      </HStack>
    );
  }
  if (Array.isArray(value)) {
    return (
      <VStack alignItems="flex-start" gap={1}>
        <Label name={name} />
        <Box pl={first ? 0 : 5}>
          {value.map((v) => (
            <Json key={v} value={v} />
          ))}
        </Box>
      </VStack>
    );
  }
  return (
    <VStack alignItems="flex-start" gap={1}>
      <Label name={name} />
      <Box pl={first ? 0 : 5}>
        {Object.entries(value).map(([k, v]) => (
          <Json key={k} name={k} value={v} />
        ))}
      </Box>
    </VStack>
  );
}

export function demo<State>() {
  const DemoContext = createContext<[State, (s: State) => void] | null>(null);

  function useDemo() {
    const value = useContext(DemoContext);
    if (value === null) {
      throw new Error("useSearch must be used within a SearchProvider");
    }
    return value;
  }

  function Demo({ init, children }: { init: State; children: ReactNode }) {
    const value = useState(init);
    const reset = useCallback(() => value[1](init), [init, value]);
    return (
      <DemoContext.Provider value={value}>
        <VStack gap={5} alignItems="flex-start">
          <Box p={5}>{children}</Box>
          <div onClick={reset}>
            <Box backgroundColor="lightgray" p={5} borderRadius={3}>
              <Json value={value[0]} first />
            </Box>
          </div>
        </VStack>
      </DemoContext.Provider>
    );
  }
  return { Demo, useDemo };
}

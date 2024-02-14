import { ReactNode } from "react";
import { Box } from "@/../styled-system/jsx";

export function Sample({ children }: { children: ReactNode }) {
  return (
    <Box
      backgroundColor="secondary"
      borderRadius={5}
      padding={5}
      display="flex"
      flexDirection="column"
      alignItems="start"
      gap={10}
      marginY={10}
    >
      {children}
    </Box>
  );
}

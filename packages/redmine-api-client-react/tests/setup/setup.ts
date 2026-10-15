import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library only unmounts automatically with vitest globals
afterEach(() => cleanup());

/**
 * Simple feature flags.
 *
 * Features disabled here even in preview are not ready for feedback.
 *
 * Preview features are not ready for general use.
 *
 * (c) 2021 - 2022, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */

import { Stage, stage as stageFromEnvironment } from "./environment";

/**
 * A union of the flag names (alphabetical order).
 */
export type Flag =
  /**
   * Enables verbose debug logging to the console of drag events.
   */
  | "dndDebug"

  /**
   * Flag to add a beta notice. Enabled for staging site but not production stages.
   */
  | "betaNotice"

  /**
   * Disables the pop-up welcome dialog.
   *
   * Added to support user-testing and has the nice side-effect of disabling
   * the dialog for local development so is worth keeping for that use alone.
   */
  | "noWelcome";

interface FlagMetadata {
  defaultOnStages: Stage[];
  name: Flag;
}

const allFlags: FlagMetadata[] = [
  // Alphabetical order.
  { name: "dndDebug", defaultOnStages: [] },
  { name: "betaNotice", defaultOnStages: ["local", "REVIEW", "STAGING"] },
  { name: "noWelcome", defaultOnStages: ["local", "REVIEW"] },
];

type Flags = Record<Flag, boolean>;

// Exposed for testing.
export const flagsForParams = (stage: Stage, params: URLSearchParams) => {
  const enableFlags = new Set(params.getAll("flag"));
  const allFlagsDefault = enableFlags.has("none")
    ? false
    : enableFlags.has("*")
    ? true
    : undefined;
  return Object.fromEntries(
    allFlags.map((f) => [
      f.name,
      isEnabled(f, stage, allFlagsDefault, enableFlags.has(f.name)),
    ])
  ) as Flags;
};

const isEnabled = (
  f: FlagMetadata,
  stage: Stage,
  allFlagsDefault: boolean | undefined,
  thisFlagOn: boolean
): boolean => {
  if (thisFlagOn) {
    return true;
  }
  if (allFlagsDefault !== undefined) {
    return allFlagsDefault;
  }
  return f.defaultOnStages.includes(stage);
};

export const flags: Flags = (() => {
  const params = new URLSearchParams(window.location.search);
  return flagsForParams(stageFromEnvironment, params);
})();

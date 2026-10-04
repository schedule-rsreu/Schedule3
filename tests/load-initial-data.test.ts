import assert from "node:assert/strict";
import test from "node:test";
import { loadInitialData } from "../src/utils/load-initial-data.ts";

test("starts every initial request before the user request finishes", async () => {
  const started: string[] = [];
  let finishUser!: () => void;

  const loading = loadInitialData(
    async () => ({ id: 1, initDataRaw: "auth" }),
    async () => {
      started.push("user");
      await new Promise<void>((resolve) => {
        finishUser = resolve;
      });
    },
    async () => {
      started.push("faculties");
    },
    async () => {
      started.push("today");
    }
  );

  await new Promise(setImmediate);
  assert.deepEqual(started, ["user", "faculties", "today"]);

  finishUser();
  await loading;
});

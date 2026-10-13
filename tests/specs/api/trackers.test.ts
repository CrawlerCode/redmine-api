import { describe, expect, it } from "vitest";
import { createTestClient, describeOperation, withResponse } from "../../helpers/client.ts";

const client = createTestClient();

describe("Trackers API", () => {
  describeOperation("Trackers_getTrackers", () => {
    it("lists all trackers", async () => {
      const v = withResponse("Trackers_getTrackers");
      const { trackers } = await client.trackersClient.getTrackers(v.options);
      v.expectValid();
      expect(trackers.length).toBeGreaterThan(0);
    });
  });
});

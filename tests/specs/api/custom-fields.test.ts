import { describe, expect, inject, it } from "vitest";
import { createAdminClient, describeOperation, withResponse } from "../../helpers/client.ts";

// The custom fields API is admin-only. Custom fields can't be created via the API, seed.rb creates them.
const client = createAdminClient();

describe("Custom Fields API", () => {
  describeOperation("CustomFields_getCustomFields", () => {
    it("lists all custom fields", async () => {
      const v = withResponse("CustomFields_getCustomFields");
      const { customFields } = await client.customFieldsClient.getCustomFields(v.options);
      v.expectValid();

      const { trackers } = await createAdminClient().trackersClient.getTrackers();
      expect(customFields.find((cf) => cf.id === inject("customFieldId"))).toMatchObject({
        name: "Test field",
        customizedType: "issue",
        fieldFormat: "string",
        isFilter: true,
      });
      // Redmine < 3.3 omits false values
      expect(customFields.find((cf) => cf.id === inject("customFieldId"))?.multiple ?? false).toBe(false);
      expect(customFields.find((cf) => cf.id === inject("customFieldId"))?.trackers?.map((t) => t.id).sort()).toEqual(
        trackers.map((t) => t.id).sort(),
      );
    });

    it("includes the possible values of list fields", async () => {
      const { customFields } = await client.customFieldsClient.getCustomFields();

      const list = customFields.find((cf) => cf.id === inject("listCustomFieldId"));
      expect(list?.fieldFormat).toBe("list");
      expect(list?.possibleValues?.map((p) => p.value)).toEqual(["Alpha", "Beta"]);
    });
  });
});

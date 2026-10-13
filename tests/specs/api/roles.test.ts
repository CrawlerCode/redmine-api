import { describe, expect, it } from "vitest";
import { createTestClient, describeOperation, expectHttpError, withResponse } from "../../helpers/client.ts";

const client = createTestClient();

describe("Roles API", () => {
  describeOperation("Roles_getRoles", () => {
    it("lists all roles", async () => {
      const v = withResponse("Roles_getRoles");
      const { roles } = await client.rolesClient.getRoles(v.options);
      v.expectValid();
      expect(roles.length).toBeGreaterThan(0);
    });
  });

  describeOperation("Roles_getRole", () => {
    it("gets a role with its permissions", async () => {
      const { roles } = await client.rolesClient.getRoles();

      const v = withResponse("Roles_getRole");
      const { role } = await client.rolesClient.getRole(roles[0].id, v.options);
      v.expectValid();
      expect(role).toMatchObject({ id: roles[0].id, name: roles[0].name });
      expect(role.permissions.length).toBeGreaterThan(0);
    });

    it("returns 404 for an unknown role", async () => {
      await expectHttpError(client.rolesClient.getRole(999_999), 404, "Roles_getRole");
    });
  });
});

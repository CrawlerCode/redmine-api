import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, withResponse } from "../../helpers/client.ts";
import { createUser } from "../../helpers/fixtures.ts";

const client = createTestClient();
const admin = createAdminClient();

describe("My Account API", () => {
  describeOperation("MyAccount_getMyAccount", () => {
    it("gets the account of the authenticated user", async () => {
      const v = withResponse("MyAccount_getMyAccount");
      const { user } = await client.myAccountClient.getMyAccount(v.options);
      v.expectValid();
      expect(user.login).toBe("tester");
    });
  });

  describeOperation("MyAccount_updateMyAccount", () => {
    // Use a separate user, so changes don't affect the "tester" account other tests rely on
    let userId: number;
    let userClient: ReturnType<typeof createTestClient>;

    beforeAll(async () => {
      const user = await createUser(admin);
      userId = user.id;
      const { user: withKey } = await admin.usersClient.getUser(user.id);
      userClient = createTestClient(withKey.apiKey!);
    });

    afterAll(async () => {
      await admin.usersClient.deleteUser(userId);
    });

    it("updates the account of the authenticated user", async () => {
      const v = withResponse("MyAccount_updateMyAccount");
      await userClient.myAccountClient.updateMyAccount({ user: { firstname: "Changed" } }, v.options);
      v.expectValid();

      const { user } = await userClient.myAccountClient.getMyAccount();
      expect(user).toMatchObject({ id: userId, firstname: "Changed" });
    });
  });
});

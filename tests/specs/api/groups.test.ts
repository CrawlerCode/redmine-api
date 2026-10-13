import { GroupQueryInclude, type User } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAdminClient, describeOperation, expectHttpError, withResponse } from "../../helpers/client.ts";
import { addMember, createGroup, createProject, createUser, unique } from "../../helpers/fixtures.ts";

// The groups API is admin-only
const client = createAdminClient();

let user: User;

beforeAll(async () => {
  user = await createUser(client);
});

afterAll(async () => {
  await client.usersClient.deleteUser(user.id);
});

describe("Groups API", () => {
  describeOperation("Groups_getGroups", () => {
    it("lists groups", async () => {
      const group = await createGroup(client);

      const v = withResponse("Groups_getGroups");
      const { groups } = await client.groupsClient.getGroups(v.options);
      v.expectValid();
      expect(groups.map((g) => g.id)).toContain(group.id);
    });

    it("includes builtin groups only when requested", async () => {
      const group = await createGroup(client);

      const v = withResponse("Groups_getGroups");
      const { groups: withBuiltin } = await client.groupsClient.getGroups({ builtin: "1", ...v.options });
      v.expectValid();
      const { groups: without } = await client.groupsClient.getGroups();

      // The builtin "Anonymous" and "Non member" groups (created by seed.rb) are added to the normal groups
      expect(withBuiltin.map((g) => g.id)).toContain(group.id);
      expect(withBuiltin.map((g) => g.id)).toEqual(expect.arrayContaining(without.map((g) => g.id)));
      expect(withBuiltin.length).toBe(without.length + 2);
    });
  });

  describeOperation("Groups_getGroup", () => {
    it("gets a group", async () => {
      const group = await createGroup(client);

      const v = withResponse("Groups_getGroup");
      const { group: fetched } = await client.groupsClient.getGroup(group.id, v.options);
      v.expectValid();
      expect(fetched).toMatchObject({ id: group.id, name: group.name });
    });

    describe("includes", () => {
      /** Gets the group with and without the include, validated against the spec */
      async function getWithAndWithout(id: number, include: GroupQueryInclude) {
        const v = withResponse("Groups_getGroup");
        const { group: withInclude } = await client.groupsClient.getGroup(id, { include: [include], ...v.options });
        v.expectValid();
        const { group: without } = await client.groupsClient.getGroup(id);
        return { withInclude, without };
      }

      it("users", async () => {
        const group = await createGroup(client, { userIds: [user.id] });

        const { withInclude, without } = await getWithAndWithout(group.id, GroupQueryInclude.Users);
        expect(withInclude.users?.map((u) => u.id)).toEqual([user.id]);
        expect(without.users).toBeUndefined();
      });

      it("memberships", async () => {
        const group = await createGroup(client);
        const project = await createProject(client);
        await addMember(client, project.id, group.id);

        const { withInclude, without } = await getWithAndWithout(group.id, GroupQueryInclude.Memberships);
        expect(withInclude.memberships?.map((m) => m.project.id)).toEqual([project.id]);
        expect(without.memberships).toBeUndefined();

        await client.projectsClient.deleteProject(project.id);
      });
    });

    it("returns 404 for an unknown group", async () => {
      await expectHttpError(client.groupsClient.getGroup(999_999), 404, "Groups_getGroup");
    });
  });

  describeOperation("Groups_createGroup", () => {
    it("creates a group", async () => {
      const name = unique("group");

      const v = withResponse("Groups_createGroup");
      const { group } = await client.groupsClient.createGroup({ group: { name } }, v.options);
      v.expectValid();
      expect(group.name).toBe(name);
    });

    it("returns 422 for an invalid group", async () => {
      await expectHttpError(client.groupsClient.createGroup({ group: { name: "" } }), 422, "Groups_createGroup");
    });
  });

  describeOperation("Groups_updateGroup", () => {
    it("updates a group", async () => {
      const group = await createGroup(client);

      const v = withResponse("Groups_updateGroup");
      await client.groupsClient.updateGroup(group.id, { group: { name: `${group.name}-updated` } }, v.options);
      v.expectValid();

      const { group: fetched } = await client.groupsClient.getGroup(group.id);
      expect(fetched.name).toBe(`${group.name}-updated`);
    });
  });

  describeOperation("Groups_deleteGroup", () => {
    it("deletes a group", async () => {
      const group = await createGroup(client);

      const v = withResponse("Groups_deleteGroup");
      await client.groupsClient.deleteGroup(group.id, v.options);
      v.expectValid();
      await expectHttpError(client.groupsClient.getGroup(group.id), 404);
    });
  });

  describeOperation("Groups_addGroupUser", () => {
    it("adds a user to a group", async () => {
      const group = await createGroup(client);

      const v = withResponse("Groups_addGroupUser");
      await client.groupsClient.addGroupUser(group.id, { userId: user.id }, v.options);
      v.expectValid();

      const { group: fetched } = await client.groupsClient.getGroup(group.id, { include: [GroupQueryInclude.Users] });
      expect(fetched.users?.map((u) => u.id)).toEqual([user.id]);
    });
  });

  describeOperation("Groups_removeGroupUser", () => {
    it("removes a user from a group", async () => {
      const group = await createGroup(client, { userIds: [user.id] });

      const v = withResponse("Groups_removeGroupUser");
      await client.groupsClient.removeGroupUser(group.id, user.id, v.options);
      v.expectValid();

      const { group: fetched } = await client.groupsClient.getGroup(group.id, { include: [GroupQueryInclude.Users] });
      expect(fetched.users ?? []).toEqual([]);
    });
  });
});

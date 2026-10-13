import { type CreateUser, type User, UserQueryInclude, UserStatus } from "redmine-api-client";
import { afterEach, describe, expect, it } from "vitest";
import {
  createAdminClient,
  createTestClient,
  describeOperation,
  expectHttpError,
  firstPage,
  withResponse,
} from "../../helpers/client.ts";
import { addMember, createGroup, createProject, createUser, unique } from "../../helpers/fixtures.ts";
import { expectPagination, pageIds } from "../../helpers/pagination.ts";

// The users API is admin-only, except getting a single user
const client = createAdminClient();

/** Users, groups and projects created by a test, deleted afterwards */
const createdIds: number[] = [];
const cleanup: (() => Promise<unknown>)[] = [];
async function newUser(data: Partial<CreateUser> = {}) {
  const user = await createUser(client, data);
  createdIds.push(user.id);
  return user;
}

afterEach(async () => {
  for (const id of createdIds.splice(0)) await client.usersClient.deleteUser(id).catch(() => {});
  for (const fn of cleanup.splice(0)) await fn().catch(() => {});
});

type UsersFilter = NonNullable<Parameters<typeof client.usersClient.getUsers>[0]>;

/** Ids of the users matching the filter, validated against the spec */
async function filterIds(options: UsersFilter) {
  const v = withResponse("Users_getUsers");
  const ids = await pageIds(client.usersClient.getUsers({ ...options, ...v.options }));
  v.expectValid();
  return ids;
}

describe("Users API", () => {
  describeOperation("Users_getUsers", () => {
    it("lists users filtered by name", async () => {
      const user = await newUser();

      const v = withResponse("Users_getUsers");
      const page = await firstPage(client.usersClient.getUsers({ name: user.login, ...v.options }));
      v.expectValid();
      expect(page.users.map((u: User) => u.id)).toEqual([user.id]);
    });

    it("paginates with offset and limit", async () => {
      for (let i = 0; i < 4; i++) await newUser();

      await expectPagination("Users_getUsers", "users", (options) => client.usersClient.getUsers(options));
    });

    describe("filters", () => {
      it("status", async () => {
        const active = await newUser();
        const locked = await newUser({ status: UserStatus.Locked });
        const name = "Test";

        // Only active users by default
        expect(await filterIds({ name })).toContain(active.id);
        expect(await filterIds({ name })).not.toContain(locked.id);
        expect(await filterIds({ name, status: UserStatus.Locked })).toContain(locked.id);
        expect(await filterIds({ name, status: UserStatus.Locked })).not.toContain(active.id);
      });

      // Known client bug: the generated client drops falsy query values, so `status=` (all users) is never sent
      it.fails("status empty lists users of all statuses", async () => {
        const active = await newUser();
        const locked = await newUser({ status: UserStatus.Locked });

        expect(await filterIds({ name: "Test", status: "" })).toEqual(expect.arrayContaining([active.id, locked.id]));
      });

      it("name matches login, first name, last name and mail", async () => {
        const firstname = unique("first");
        const user = await newUser({ firstname });

        expect(await filterIds({ name: user.login })).toEqual([user.id]);
        expect(await filterIds({ name: firstname })).toEqual([user.id]);
        expect(await filterIds({ name: user.lastname })).toEqual([user.id]);
        expect(await filterIds({ name: user.mail! })).toEqual([user.id]);
      });

      it("group_id", async () => {
        const member = await newUser();
        await newUser();
        const group = await createGroup(client, { userIds: [member.id] });
        cleanup.push(() => client.groupsClient.deleteGroup(group.id));

        expect(await filterIds({ groupId: group.id })).toEqual([member.id]);
      });
    });
  });

  describeOperation("Users_getUser", () => {
    it("gets a user", async () => {
      const user = await newUser();

      const v = withResponse("Users_getUser");
      const { user: fetched } = await client.usersClient.getUser(user.id, v.options);
      v.expectValid();
      expect(fetched).toMatchObject({ id: user.id, login: user.login });
    });

    describe("includes", () => {
      /** Gets the user with and without the include, validated against the spec */
      async function getWithAndWithout(id: number, include: UserQueryInclude) {
        const v = withResponse("Users_getUser");
        const { user: withInclude } = await client.usersClient.getUser(id, { include: [include], ...v.options });
        v.expectValid();
        const { user: without } = await client.usersClient.getUser(id);
        return { withInclude, without };
      }

      it("memberships", async () => {
        const user = await newUser();
        const project = await createProject(client);
        cleanup.push(() => client.projectsClient.deleteProject(project.id));
        await addMember(client, project.id, user.id);

        const { withInclude, without } = await getWithAndWithout(user.id, UserQueryInclude.Memberships);
        expect(withInclude.memberships?.map((m) => m.project.id)).toEqual([project.id]);
        expect(without.memberships).toBeUndefined();
      });

      it("groups", async () => {
        const user = await newUser();
        const group = await createGroup(client, { userIds: [user.id] });
        cleanup.push(() => client.groupsClient.deleteGroup(group.id));

        const { withInclude, without } = await getWithAndWithout(user.id, UserQueryInclude.Groups);
        expect(withInclude.groups?.map((g) => g.id)).toEqual([group.id]);
        expect(without.groups).toBeUndefined();
      });
    });

    it("gets the current user", async () => {
      const v = withResponse("Users_getUser");
      const { user } = await createTestClient().usersClient.getUser("current", v.options);
      v.expectValid();
      expect(user.login).toBe("tester");
    });

    it("returns 404 for an unknown user", async () => {
      await expectHttpError(client.usersClient.getUser(999_999), 404, "Users_getUser");
    });
  });

  describeOperation("Users_createUser", () => {
    it("creates a user", async () => {
      const login = unique("user");

      const v = withResponse("Users_createUser");
      const { user } = await client.usersClient.createUser(
        { user: { login, firstname: "First", lastname: "Last", mail: `${login}@example.com`, password: "Password123!" } },
        v.options,
      );
      createdIds.push(user.id);
      v.expectValid();
      expect(user).toMatchObject({ login, firstname: "First", lastname: "Last", mail: `${login}@example.com` });
    });

    it("returns 422 for an invalid user", async () => {
      await expectHttpError(
        client.usersClient.createUser({ user: { login: "", firstname: "", lastname: "", mail: "invalid" } }),
        422,
        "Users_createUser",
      );
    });
  });

  describeOperation("Users_updateUser", () => {
    it("updates a user", async () => {
      const user = await newUser();

      const v = withResponse("Users_updateUser");
      await client.usersClient.updateUser(user.id, { user: { firstname: "Updated" } }, v.options);
      v.expectValid();

      const { user: fetched } = await client.usersClient.getUser(user.id);
      expect(fetched.firstname).toBe("Updated");
    });
  });

  describeOperation("Users_deleteUser", () => {
    it("deletes a user", async () => {
      const user = await createUser(client);

      const v = withResponse("Users_deleteUser");
      await client.usersClient.deleteUser(user.id, v.options);
      v.expectValid();
      await expectHttpError(client.usersClient.getUser(user.id), 404);
    });
  });
});

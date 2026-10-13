import type { Membership, Project, Reference } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, expectHttpError, firstPage, withResponse } from "../../helpers/client.ts";
import { addMember, createProject, createUser } from "../../helpers/fixtures.ts";
import { expectPagination } from "../../helpers/pagination.ts";

const client = createTestClient();
const admin = createAdminClient();

let project: Project;
let roles: Reference[];
const users: number[] = [];

beforeAll(async () => {
  project = await createProject(client);
  ({ roles } = await client.rolesClient.getRoles());
});

afterAll(async () => {
  await admin.projectsClient.deleteProject(project.id);
  for (const id of users) await admin.usersClient.deleteUser(id);
});

/** Adds a new user to the project */
async function createMembership(roleId = roles[0].id) {
  const user = await createUser(admin);
  users.push(user.id);
  const { membership } = await client.membershipsClient.createProjectMembership(project.id, {
    membership: { userId: user.id, roleIds: [roleId] },
  });
  return membership;
}

describe("Memberships API", () => {
  describeOperation("Memberships_getProjectMemberships", () => {
    it("lists the memberships of a project", async () => {
      const membership = await createMembership();

      const v = withResponse("Memberships_getProjectMemberships");
      const page = await firstPage(client.membershipsClient.getProjectMemberships(project.id, v.options));
      v.expectValid();
      expect(page.memberships.map((m: Membership) => m.id)).toContain(membership.id);
    });

    it("paginates with offset and limit", async () => {
      const other = await createProject(client);
      for (let i = 0; i < 4; i++) {
        const user = await createUser(admin);
        users.push(user.id);
        await addMember(client, other.id, user.id);
      }

      await expectPagination("Memberships_getProjectMemberships", "memberships", (options) =>
        client.membershipsClient.getProjectMemberships(other.id, options),
      );
      await admin.projectsClient.deleteProject(other.id);
    });
  });

  describeOperation("Memberships_getMembership", () => {
    it("gets a membership", async () => {
      const membership = await createMembership();

      const v = withResponse("Memberships_getMembership");
      const { membership: fetched } = await client.membershipsClient.getMembership(membership.id, v.options);
      v.expectValid();
      expect(fetched).toMatchObject({ id: membership.id, user: membership.user });
    });

    it("returns 404 for an unknown membership", async () => {
      await expectHttpError(client.membershipsClient.getMembership(999_999), 404, "Memberships_getMembership");
    });
  });

  describeOperation("Memberships_createProjectMembership", () => {
    it("adds a user to a project", async () => {
      const user = await createUser(admin);
      users.push(user.id);

      const v = withResponse("Memberships_createProjectMembership");
      const { membership } = await client.membershipsClient.createProjectMembership(
        project.id,
        { membership: { userId: user.id, roleIds: [roles[0].id] } },
        v.options,
      );
      v.expectValid();
      expect(membership.user?.id).toBe(user.id);
      expect(membership.roles.map((r) => r.id)).toEqual([roles[0].id]);
    });

    it("returns 422 without roles", async () => {
      const user = await createUser(admin);
      users.push(user.id);

      await expectHttpError(
        client.membershipsClient.createProjectMembership(project.id, { membership: { userId: user.id, roleIds: [] } }),
        422,
        "Memberships_createProjectMembership",
      );
    });
  });

  describeOperation("Memberships_updateMembership", () => {
    it("updates the roles of a membership", async () => {
      const membership = await createMembership(roles[0].id);

      const v = withResponse("Memberships_updateMembership");
      await client.membershipsClient.updateMembership(membership.id, { membership: { roleIds: [roles[1].id] } }, v.options);
      v.expectValid();

      const { membership: fetched } = await client.membershipsClient.getMembership(membership.id);
      expect(fetched.roles.map((r) => r.id)).toEqual([roles[1].id]);
    });
  });

  describeOperation("Memberships_deleteMembership", () => {
    it("deletes a membership", async () => {
      const membership = await createMembership();

      const v = withResponse("Memberships_deleteMembership");
      await client.membershipsClient.deleteMembership(membership.id, v.options);
      v.expectValid();
      await expectHttpError(client.membershipsClient.getMembership(membership.id), 404);
    });
  });
});

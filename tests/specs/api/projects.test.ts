import { type CreateProject, type Project, ProjectQueryInclude } from "redmine-api-client";
import { afterEach, describe, expect, inject, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, expectHttpError, firstPage, spec, withResponse } from "../../helpers/client.ts";
import { createIssueCategory, createProject, unique } from "../../helpers/fixtures.ts";
import { expectPagination } from "../../helpers/pagination.ts";

const client = createTestClient();
const admin = createAdminClient();

/** Projects created by a test, deleted afterwards */
const createdIds: number[] = [];
async function newProject(data: Partial<CreateProject> = {}) {
  const project = await createProject(client, data);
  createdIds.push(project.id);
  return project;
}

afterEach(async () => {
  for (const id of createdIds.splice(0).reverse()) await admin.projectsClient.deleteProject(id).catch(() => {});
});

describe("Projects API", () => {
  describeOperation("Projects_getProjects", () => {
    it("lists projects", async () => {
      const project = await newProject();

      const v = withResponse("Projects_getProjects");
      const page = await firstPage(client.projectsClient.getProjects({ include: [ProjectQueryInclude.Trackers], ...v.options }));
      v.expectValid();
      expect(page.projects.map((p: Project) => p.id)).toContain(project.id);
    });

    it("paginates with offset and limit", async () => {
      for (let i = 0; i < 4; i++) await newProject();

      await expectPagination("Projects_getProjects", "projects", (options) => client.projectsClient.getProjects(options));
    });

    it("includes trackers only when requested", async () => {
      const project = await newProject();

      const withInclude = await firstPage(client.projectsClient.getProjects({ include: [ProjectQueryInclude.Trackers] }));
      expect(withInclude.projects.find((p: Project) => p.id === project.id)?.trackers?.length).toBeGreaterThan(0);

      const without = await firstPage(client.projectsClient.getProjects());
      expect(without.projects.find((p: Project) => p.id === project.id)?.trackers).toBeUndefined();
    });
  });

  describeOperation("Projects_getProject", () => {
    it("gets a project by id and by identifier", async () => {
      const project = await newProject();

      const byId = withResponse("Projects_getProject");
      const { project: fetched } = await client.projectsClient.getProject(project.id, byId.options);
      byId.expectValid();
      expect(fetched).toMatchObject({ id: project.id, identifier: project.identifier });

      const { project: byIdentifier } = await client.projectsClient.getProject(project.identifier);
      expect(byIdentifier.id).toBe(project.id);
    });

    describe("includes", () => {
      /** Gets the project with and without the include, validated against the spec */
      async function getWithAndWithout(id: number, include: ProjectQueryInclude) {
        const v = withResponse("Projects_getProject");
        const { project: withInclude } = await client.projectsClient.getProject(id, {
          include: [include],
          ...v.options,
        });
        v.expectValid();
        const { project: without } = await client.projectsClient.getProject(id);
        return { withInclude, without };
      }

      it("trackers", async () => {
        const project = await newProject();
        const { trackers } = await client.trackersClient.getTrackers();

        const { withInclude, without } = await getWithAndWithout(project.id, ProjectQueryInclude.Trackers);
        expect(withInclude.trackers?.map((t) => t.id).sort()).toEqual(trackers.map((t) => t.id).sort());
        expect(without.trackers).toBeUndefined();
      });

      it("issue_categories", async () => {
        const project = await newProject();
        const category = await createIssueCategory(client, project.id);

        const { withInclude, without } = await getWithAndWithout(project.id, ProjectQueryInclude.IssueCategories);
        expect(withInclude.issueCategories?.map((c) => c.id)).toEqual([category.id]);
        expect(without.issueCategories).toBeUndefined();
      });

      it("enabled_modules", async () => {
        const project = await newProject();

        const { withInclude, without } = await getWithAndWithout(project.id, ProjectQueryInclude.EnabledModules);
        expect(withInclude.enabledModules?.map((m) => m.name)).toContain("issue_tracking");
        expect(without.enabledModules).toBeUndefined();
      });

      it.skipIf(!spec.isAtLeast("3.4.0"))("time_entry_activities", async () => {
        const project = await newProject();
        const { timeEntryActivities } = await client.enumerationsClient.getTimeEntryActivities();

        const { withInclude, without } = await getWithAndWithout(project.id, ProjectQueryInclude.TimeEntryActivities);
        expect(withInclude.timeEntryActivities?.map((a) => a.id).sort()).toEqual(timeEntryActivities.map((a) => a.id).sort());
        expect(without.timeEntryActivities).toBeUndefined();
      });

      it.skipIf(!spec.isAtLeast("4.2.0"))("issue_custom_fields", async () => {
        // Fields "for all projects" are only included since Redmine 5.1, so enable it explicitly
        const project = await newProject({ issueCustomFieldIds: [inject("customFieldId")] });

        const { withInclude, without } = await getWithAndWithout(project.id, ProjectQueryInclude.IssueCustomFields);
        expect(withInclude.issueCustomFields?.map((cf) => cf.id)).toContain(inject("customFieldId"));
        expect(without.issueCustomFields).toBeUndefined();
      });
    });

    it("gets the parent of a subproject", async () => {
      const parent = await newProject();
      const child = await newProject({ parentId: parent.id });

      const v = withResponse("Projects_getProject");
      const { project } = await client.projectsClient.getProject(child.id, v.options);
      v.expectValid();
      expect(project.parent?.id).toBe(parent.id);
    });

    it("returns 404 for an unknown project", async () => {
      await expectHttpError(client.projectsClient.getProject(999_999), 404, "Projects_getProject");
      await expectHttpError(client.projectsClient.getProject("does-not-exist"), 404, "Projects_getProject");
    });
  });

  describeOperation("Projects_createProject", () => {
    it("creates a project", async () => {
      const identifier = unique("project");

      const v = withResponse("Projects_createProject");
      const { project } = await client.projectsClient.createProject(
        { project: { name: "Created", identifier, description: "Description", isPublic: false } },
        v.options,
      );
      createdIds.push(project.id);
      v.expectValid();
      expect(project).toMatchObject({ name: "Created", identifier, description: "Description" });
      // Redmine < 3.3 omits false values
      expect(project.isPublic ?? false).toBe(false);
    });

    it("returns 422 for an invalid project", async () => {
      await expectHttpError(
        client.projectsClient.createProject({ project: { name: "", identifier: "Invalid Identifier" } }),
        422,
        "Projects_createProject",
      );
    });
  });

  describeOperation("Projects_updateProject", () => {
    it("updates a project", async () => {
      const project = await newProject();

      const v = withResponse("Projects_updateProject");
      await client.projectsClient.updateProject(project.id, { project: { name: "Updated" } }, v.options);
      v.expectValid();

      const { project: fetched } = await client.projectsClient.getProject(project.id);
      expect(fetched.name).toBe("Updated");
    });
  });

  describeOperation("Projects_deleteProject", () => {
    it("deletes a project", async () => {
      const project = await createProject(client);
      // Only admins can delete projects before Redmine 4.2 (`delete_project` permission)
      const deleter = spec.isAtLeast("4.2.0") ? client : admin;

      const v = withResponse("Projects_deleteProject");
      await deleter.projectsClient.deleteProject(project.id, v.options);
      v.expectValid();
      await expectHttpError(client.projectsClient.getProject(project.id), 404);
    });
  });

  describeOperation("Projects_archiveProject", () => {
    it("archives a project", async () => {
      const project = await newProject();

      // Archiving is admin-only
      const v = withResponse("Projects_archiveProject");
      await admin.projectsClient.archiveProject(project.id, v.options);
      v.expectValid();
      // Archived projects are not accessible, even for admins
      await expectHttpError(admin.projectsClient.getProject(project.id), 403);
    });
  });

  describeOperation("Projects_unarchiveProject", () => {
    it("unarchives a project", async () => {
      const project = await newProject();
      await admin.projectsClient.archiveProject(project.id);

      // Unarchiving is admin-only
      const v = withResponse("Projects_unarchiveProject");
      await admin.projectsClient.unarchiveProject(project.id, v.options);
      v.expectValid();

      const { project: fetched } = await client.projectsClient.getProject(project.id);
      expect(fetched.status).toBe(1);
    });
  });

  describeOperation("Projects_closeProject", () => {
    it("closes a project", async () => {
      const project = await newProject();

      const v = withResponse("Projects_closeProject");
      await client.projectsClient.closeProject(project.id, v.options);
      v.expectValid();

      // Closed projects are still visible
      const { project: fetched } = await client.projectsClient.getProject(project.id);
      expect(fetched.status).toBe(5);
    });
  });

  describeOperation("Projects_reopenProject", () => {
    it("reopens a closed project", async () => {
      const project = await newProject();
      await client.projectsClient.closeProject(project.id);

      const v = withResponse("Projects_reopenProject");
      await client.projectsClient.reopenProject(project.id, v.options);
      v.expectValid();

      const { project: fetched } = await client.projectsClient.getProject(project.id);
      expect(fetched.status).toBe(1);
    });
  });
});

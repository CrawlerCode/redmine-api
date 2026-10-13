import "@typespec/http";
import "@typespec/openapi";
import "@typespec/versioning";

import "./attachments/service.tsp";
import "./custom-fields/service.tsp";
import "./enumerations/service.tsp";
import "./files/service.tsp";
import "./groups/service.tsp";
import "./issue-categories/service.tsp";
import "./issue-relations/service.tsp";
import "./issue-statuses/service.tsp";
import "./issues/service.tsp";
import "./journals/service.tsp";
import "./memberships/service.tsp";
import "./my-account/service.tsp";
import "./news/service.tsp";
import "./projects/service.tsp";
import "./queries/service.tsp";
import "./roles/service.tsp";
import "./search/service.tsp";
import "./time-entries/service.tsp";
import "./trackers/service.tsp";
import "./users/service.tsp";
import "./versions/service.tsp";
import "./wiki-pages/service.tsp";
import "./server-versions.tsp";

/**
 * Redmine REST API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_api
 */
@service(#{ title: "Redmine REST API" })
@Versioning.versioned(RedmineServerVersion)
@Http.useAuth(Http.ApiKeyAuth<Http.ApiKeyLocation.header, "X-Redmine-API-Key">)
namespace Redmine;

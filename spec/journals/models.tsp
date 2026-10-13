import "@typespec/versioning";

import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Journals;

/**
 * Issue journal entry (note and/or changes)
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Journals
 */
model Journal {
  /**
   * Journal ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Author reference
   */
  @visibility(Lifecycle.Read)
  user: Reference;

  /**
   * Notes. Setting empty notes on a journal without details deletes the journal.
   */
  notes: string | null;

  /**
   * Journal creation date
   */
  @visibility(Lifecycle.Read)
  created_on: utcDateTime;

  /**
   * Journal updated date
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`6.0.0`)
  updated_on: utcDateTime;

  /**
   * Last editor of the notes
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`6.0.0`)
  updated_by?: Reference;

  /**
   * Are the notes private
   */
  private_notes: boolean;

  /**
   * Changed properties
   */
  @visibility(Lifecycle.Read)
  details: JournalDetail[];
}

/**
 * Change of a single property in a journal entry
 */
model JournalDetail {
  /**
   * Property kind
   */
  property: "attr" | "cf" | "attachment" | "relation" | string;

  /**
   * Property name (attribute name, custom field ID, attachment ID or relation type)
   */
  name: string;

  /**
   * Previous value
   */
  old_value?: string | null;

  /**
   * New value
   */
  new_value?: string | null;
}

/**
 * Journal update payload. All properties are optional.
 */
model UpdateJournal {
  ...OptionalProperties<Update<Journal>>;
}

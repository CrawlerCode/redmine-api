# Prepares a fresh Redmine for the API tests. Run with `rails runner /tests-setup/seed.rb`.
# Idempotent, prints `key=value` lines read by global-setup.ts.

# Trackers, issue statuses, priorities, roles, ...
Redmine::DefaultData::Loader.load("en") if Redmine::DefaultData::Loader.no_data?

Setting.rest_api_enabled = "1"

admin = User.find_by!(login: "admin")
admin.update!(must_change_passwd: false)

# Regular (non admin) user that runs the tests. Like in a normal Redmine setup, it can create projects
# (permission of the "Non member" role) and becomes "Manager" of the projects it creates.
tester = User.find_by(login: "tester") || User.new(firstname: "Test", lastname: "Tester", mail: "tester@example.com").tap do |u|
  u.login = "tester"
  u.password = "Password123!"
  u.save!
end
Role.non_member.add_permission!(:add_project)
Setting.new_project_user_role_id = Role.find_by!(name: "Manager").id.to_s

# Builtin groups ("Anonymous", "Non member") are only created on first use
GroupAnonymous.load_instance
GroupNonMember.load_instance

# Issue custom field for all projects and trackers (custom fields can't be created via the API)
custom_field = IssueCustomField.find_by(name: "Test field") || IssueCustomField.create!(
  name: "Test field",
  field_format: "string",
  is_for_all: true,
  is_filter: true,
  trackers: Tracker.all
)

# Public saved query for the `query_id` filter (queries can't be created via the API)
query = IssueQuery.find_by(name: "Closed issues") || IssueQuery.new(name: "Closed issues").tap do |q|
  q.user = admin
  q.visibility = Query::VISIBILITY_PUBLIC
  q.add_filter("status_id", "c", [""])
  q.save!
end

# More public queries, so the queries list can be paginated
%w(Query\ A Query\ B Query\ C).each do |name|
  next if IssueQuery.exists?(name: name)
  IssueQuery.new(name: name).tap do |q|
    q.user = admin
    q.visibility = Query::VISIBILITY_PUBLIC
    q.save!
  end
end

# Public time entry query for the `type` parameter of the queries API
if Object.const_defined?(:TimeEntryQuery) && !TimeEntryQuery.exists?(name: "Time entries")
  TimeEntryQuery.new(name: "Time entries").tap do |q|
    q.user = admin
    q.visibility = Query::VISIBILITY_PUBLIC
    q.save!
  end
end

# List custom field (not enabled for any project) for the custom fields API
list_field = IssueCustomField.find_by(name: "Test list") || IssueCustomField.create!(
  name: "Test list",
  field_format: "list",
  possible_values: %w(Alpha Beta),
  is_for_all: false,
  trackers: Tracker.all
)

# Public project with news, as news can only be created via the API since Redmine 4.1
news_project = Project.find_by(identifier: "seed-news") || Project.new.tap do |p|
  p.name = "Seed news"
  p.identifier = "seed-news"
  p.is_public = true
  p.save!
end
(1..4).each do |i|
  next if News.exists?(project_id: news_project.id, title: "Seed news #{i}")
  News.new(title: "Seed news #{i}", summary: "Summary #{i}", description: "Description #{i}").tap do |n|
    n.project = news_project
    n.author = admin
    n.save!
  end
end

puts "server_version=#{Redmine::VERSION::ARRAY.take(3).join('.')}"
puts "api_key=#{tester.api_key}"
puts "admin_api_key=#{admin.api_key}"
puts "custom_field_id=#{custom_field.id}"
puts "query_id=#{query.id}"
puts "list_custom_field_id=#{list_field.id}"
puts "news_project_id=#{news_project.id}"

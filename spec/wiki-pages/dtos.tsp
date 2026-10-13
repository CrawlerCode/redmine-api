import "./models.tsp";

namespace Redmine.WikiPages.DTOs;

model WikiPagesDto {
  wiki_pages: WikiPageListItem[];
}

model WikiPageDto {
  wiki_page: WikiPage;
}

model UpdateWikiPageDto {
  wiki_page: UpdateWikiPage;
}

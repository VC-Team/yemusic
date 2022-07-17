import { ClientDomain } from '@yemusic/client-domain/core';
import { ISearch, SearchDomain } from '@yemusic/client-domain/domains/search';

export interface IWebSearch extends ISearch {
  recentData: string[];
}

const initialStateSearch: IWebSearch = {
  searchData: [],
  recentData: [],
};

@ClientDomain()
export class WebSearchDomain extends SearchDomain<IWebSearch> {}

export const { SearchContext, SearchProvider } = new WebSearchDomain(initialStateSearch);

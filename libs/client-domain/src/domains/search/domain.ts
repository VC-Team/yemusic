import { ClientDomainProvider } from '../../core/client-domain-provider';
import { Action, ClientDomain, ValidateParam } from '../../core/decorators';

import { searchInputSchema } from './schemas';

export interface ISearch {
  searchData: string[];
}

@ClientDomain()
export class SearchDomain<ISearchOverwrite extends ISearch> extends ClientDomainProvider<ISearchOverwrite> {
  public SearchContext = this.context;

  public SearchProvider = this.provider;

  @Action()
  actionSearchSong(@ValidateParam(searchInputSchema) searchInput: string) {
    //
  }
}

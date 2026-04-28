import styles from './search.module.scss';
import template from './search.template.html';
import { UserService } from '@/api/user.service';
import { UserItem } from '@/components/ui/user-item/user-item.component';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';
import { debounce } from '@/utils/debounce.utils';

export class Search extends ChildComponent {
  constructor() {
    super();
    this.userService = new UserService();
  }

  async #handleSearch(event) {
    const searchTerm = event.target.value;
    const searchResultsBlock = $I(this.element).find('#search-results');

    if (!searchTerm) {
      searchResultsBlock.html('');
      return;
    }

    await this.userService.getAll(searchTerm, (users) => {
      searchResultsBlock.html('');
      users.forEach((user, index) => {
        const userItem = new UserItem(user, true, () => {
          //TODO sending
          searchResultsBlock.html('');
        }).render();

        $I(userItem)
          .addClass(styles.item)
          .css('transition-delay', `${index * 0.1}s`);

        searchResultsBlock.append(userItem);

        setTimeout(() => {
          userItem.addClass(styles.visible);
        }, 100);
      });
    });
  }
  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    const debouncedHandleSearch = debounce(this.#handleSearch.bind(this), 500);

    $I(this.element)
      .find('input')
      .input({
        type: 'search',
        name: 'search',
        placeholder: 'Search contacts',
      })
      .on('input', debouncedHandleSearch);
    return this.element;
  }
}

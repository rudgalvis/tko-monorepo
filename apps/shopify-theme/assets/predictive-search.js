class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector('#predictive-search');
 

    this.input.addEventListener('input', debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
     // this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }
 

  getSearchResults(searchTerm) {
    fetch(`${routes.predictive_search_url}?q=${searchTerm}&resources[type]=product&resources[limit]=4&section_id=predictive-search`)
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
        this.predictiveSearchResults.innerHTML = resultsMarkup;
        this.open();
      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }



  open() {
    this.predictiveSearchResults.style.display = 'block';
    $('.predictive').removeClass('pre-search');
    $('.rsm-item').eq(1).css('display','none');
    $('.rsm-item').eq(2).css('display','none');
    $('.rsm-item').eq(0).css('width','100%');
  }

  close() {
    this.predictiveSearchResults.style.display = 'none';
    $('.predictive').removeClass('pre-search');
    $('.rsm-item').eq(1).css('display','block');
    $('.rsm-item').eq(2).css('display','block');
    $('.rsm-item').eq(0).css('width','auto');
    $('predictive-search').css('border-bottom','none');
    $('predictive-search').css('display','none');
  }
}

customElements.define('predictive-search', PredictiveSearch);

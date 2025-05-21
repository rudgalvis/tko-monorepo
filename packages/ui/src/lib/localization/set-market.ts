import { resetDisplayCurrencyMemory, resetMarketCurrencyMemory } from '$lib/store/currency.js';

export type AvailableMarketsCountryCodes = 'lt' | 'au' | 'gb' | 'us';
export type AvailableMarketsLanguageCodes = 'en';

export const setMarket = ({
	country_code,
	language_code = 'en'
}: {
	country_code: AvailableMarketsCountryCodes;
	language_code?: AvailableMarketsLanguageCodes;
}) => {
	const formId = crypto.randomUUID();
	const formHtml = `
    <form id="${formId}" action="/localization" method="POST" hidden>
      <input name="_method" value="PUT">
      <input name="country_code" value="${country_code}">
      <input name="language_code" value="${language_code.toLowerCase()}">
    </form>
  `;
	document.body.insertAdjacentHTML('beforeend', formHtml);

	const form = document.getElementById(formId) as HTMLFormElement;

	resetDisplayCurrencyMemory();
	resetMarketCurrencyMemory();

	// Wait to make sure local storage is really reset
	setTimeout(() => {
		form?.submit();

		// Remove the form from DOM after submission
		form?.remove();
	});
};

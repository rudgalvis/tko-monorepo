import { resetDisplayCurrencyMemory, resetMarketCurrencyMemory } from '$lib/store/currency.js';
import type { AvailableMarketsCountryCode } from '$lib/types/AvailableMarketsCountryCode.js';
import type { AvailableMarketsLanguageCode } from '$lib/types/AvailableMarketsLanguageCode.js';

export const setMarket = ({
	country_code,
	language_code = 'en'
}: {
	country_code: AvailableMarketsCountryCode;
	language_code?: AvailableMarketsLanguageCode;
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

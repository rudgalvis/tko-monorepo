export const setLocale = ({ country, language }: { country: string; language: string }) => {
	const formId = crypto.randomUUID();
	const formHtml = `
    <form id="${formId}" action="/localization" method="POST" hidden>
      <input name="_method" value="PUT">
      <input name="country_code" value="${country}">
      <input name="language_code" value="${language}">
    </form>
  `;
	document.body.insertAdjacentHTML('beforeend', formHtml);

	const form = document.getElementById(formId) as HTMLFormElement;

	form?.submit();

	// Remove the form from DOM after submission
	form?.remove();
};

export type HTMLInputElementTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

  /**
 * src: https://www.w3schools.com/TAgs/att_input_autocomplete.asp
 */
export type HTMLInputElementAutoCompleteValues =
| 'on' /** Default. Autocomplete is on (enabled) */
| 'off' /** Autocomplete is off (disabled) */
| 'address-line1' /** Expects the first line of the street address */
| 'address-line2' /** Expects the second line of the street address */
| 'address-line3' /** Expects the third line of the street address */
| 'address-level1' /** Expects the first level of the address, e.g. the county */
| 'address-level2' /** Expects the second level of the address, e.g. the city */
| 'address-level3' /** Expects the third level of the address */
| 'address-level4' /** Expects the fourth level of the address */
| 'street-address' /** Expects the full street address */
| 'country' /** Expects the country code */
| 'country-name' /** Expects the country name */
| 'postal-code' /** Expects the post code */
| 'name' /** Expects the full name */
| 'additional-name' /** Expects the middle name */
| 'family-name' /** Expects the last name */
| 'give-name' /** Expects the first name */
| 'honoric-prefix' /** Expects the title, like "Mr", "Ms" etc. */
| 'honoric-suffix' /** Expects the suffix, like "5", "Jr." etc. */
| 'nickname' /** Expects the nickname */
| 'organization-title' /** Expects the job title */
| 'username' /** Expects the username */
| 'new-password' /** Expects a new password */
| 'current-password' /** Expects the current password */
| 'bday' /** Expects the full birthday date */
| 'bday-day' /** Expects the day of the birthday date */
| 'bday-month' /** Expects the month of the birthday date */
| 'bday-year' /** Expects the year of the birthday date */
| 'sex' /** Expects the gender */
| 'one-time-code' /** Expects a one-time code for verification etc. */
| 'organization' /** Expects the company name */
| 'cc-name' /** Expects the credit card owner's full name */
| 'cc-given-name' /** Expects the credit card owner's first name */
| 'cc-additional-name' /** Expects the credit card owner's middle name */
| 'cc-family-name' /** Expects the credit card owner's full name */
| 'cc-number' /** Expects the credit card's number */
| 'cc-exp' /** Expects the credit card's expiration date */
| 'cc-exp-month' /** Expects the credit card's expiration month */
| 'cc-exp-year' /** Expects the credit card's expiration year */
| 'cc-csc' /** Expects the CVC code */
| 'cc-type' /** Expects the credit card's type of payment */
| 'transaction-currency' /** Expects the currency */
| 'transaction-amount' /** Expects a number, the amount */
| 'language' /** Expects the preferred language */
| 'url' /** Expects a web address */
| 'email' /** Expects the email address */
| 'photo' /** Expects an image */
| 'tel' /** Expects the full phone number */
| 'tel-country-code' /** Expects the country code of the phone number */
| 'tel-national' /** Expects the phone number with no country code */
| 'tel-area-code' /** Expects the area code of the phone number */
| 'tel-local' /** Expects the phone number with no country code and no area code */
| 'tel-local-prefix' /** Expects the local prefix of the phone number */
| 'tel-local-suffix' /** Expects the local suffix of the phone number */
| 'tel-extension' /** Expects the extension code of the phone number */
| 'impp' /** Expects the URL of an instant messaging protocol endpoint */;
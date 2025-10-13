export interface ClientIface {
  cardData: { cardBarcode: string, isTemp: boolean };
  contactData: { areaCode: string, email: string, phoneNumber: string };
  personalData: { firstName: string, identityCardNumber: string, lastName: string, secondName: string};
	residenceData: { city: string, country: string, flatNumber: number, street: string, streetNumber: number, zipCode: string };
}
export class CreateClientDto {
  cardData: { cardBarcode: string }
	contactData: { areaCode: string, email: string, phoneNumber: string }
	personalData: { firstName: string, identityCardNumber: string, lastName: string, secondName: string}
	residenceData: { city: string, country: string, flatNumber: string, street: string, streetNumber: string, zipCode: string }
}
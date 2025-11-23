export class AddClientDto {
  cardData: { cardId: number, isTemp: boolean }
	contactData: { areaCode: string, email: string, phoneNumber: string }
	personalData: { firstName: string, identityCardNumber: string, lastName: string, middleName: string}
	residenceData: { city: string, country: string, flatNumber: number, street: string, streetNumber: number, zipCode: string }
}
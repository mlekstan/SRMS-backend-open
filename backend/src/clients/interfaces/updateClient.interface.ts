export interface UpdateClientIface {
  cardData: {
    cards: {
      card: {
        id: number;
        barcode?: string;
        isTemp?: boolean;
      };
      type: "fetched" |  "added";
      isReturned: boolean;
      errors?: {
        barcode: boolean;
        isTemp: boolean;
      };
    }[];
  };
  
  personalData: {
    firstName: string; middleName: string; lastName: string; identityCardNumber: string;
  };
  
  residenceData: {
    country: string; city: string; street: string; streetNumber: number; flatNumber: number; zipCode: string;
  };

  contactData: {
    areaCode: string; phoneNumber: string; email: string;
  };
}
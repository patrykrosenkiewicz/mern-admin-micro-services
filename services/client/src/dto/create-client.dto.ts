export class CreateClientDto {
  readonly enabled: boolean;
  readonly company: string;
  readonly name: string;
  readonly surname: string;
  readonly bankAccount: string;
  readonly companyRegNumber: string;
  readonly companyTaxNumber: string;
  readonly companyTaxID: string;
  readonly customField: {
    fieldName: string;
    fieldValue: string;
  };
  readonly address: string;
  readonly country: string;
  readonly phone: string;
  readonly email: string;
  readonly website: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface AddressInterface extends Document {
  typeVal: string;
  street: string;
  district: string;
  city: string;
  state: string;
  num: string;
  cep: string;
  compl: string;
}
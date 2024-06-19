export type IdContrat = number;
export type Address = string;
export type Wattage = number;

export interface ConsommationDto {
  addresse: Address;
  relevés: {
    pwr: Wattage;
  }[];
}

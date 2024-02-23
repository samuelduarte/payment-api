export interface Payment {
  id: string;
  name: string;
  numberCard: string;
  amount: number;
  validateDateCard: Date;
  cvv: string;
}

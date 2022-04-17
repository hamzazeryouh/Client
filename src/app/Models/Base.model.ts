export interface IBase {
  id: number;
  creationDate: string;
  modificationDate: string;
}

export class Base {
  id!: number;
  creationDate!: string;
  modificationDate!: string;
}
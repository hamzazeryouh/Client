import { Base, IBase } from "./Base.model";


export interface IMDM extends IBase {

    Name: string|null;

  }

  export class MDM extends Base {

    Name: string|null;

  }


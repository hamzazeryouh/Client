import { Base, IBase } from "./Base.model";


        
export interface ICommenter extends IBase {

  Commente:string;
  
}
export class Commenter extends Base {
  Commente:string;
}






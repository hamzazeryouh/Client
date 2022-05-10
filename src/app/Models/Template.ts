import { Base, IBase } from "./Base.model";


        
export interface ITemplate extends IBase {

  technologie:string;
  them:string;
  title :string;
  note :Number;
  EvaluationId:Number;
}
export class Template extends Base {

      technologie:string;
      them:string;
      title :string;
      note :Number;
      EvaluationId:Number;
  
}






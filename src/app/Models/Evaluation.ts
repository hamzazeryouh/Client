import { Base, IBase } from "./Base.model";


        
export interface IEvaluation extends IBase {

      Evaluateur  :string;
      DateEntretien :Date;
      CandidatId   :number;
      CommenterId :number;
      TemplateId :number
      Note:string;
  
}
export class Evaluation extends Base {

      Evaluateur  :string;
      DateEntretien :Date;
      CandidatId   :number;
      CommenterId :number;


  
}


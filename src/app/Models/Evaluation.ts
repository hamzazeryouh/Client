import { Base, IBase } from "./Base.model";


        
export interface IEvaluation extends IBase {

      Evaluateur  :string;
      DateEntretien :Date;
      CandidatId   :number;
      CommenterId :number
      TemplateId :number
  
}



export class Evaluation extends Base {

      Evaluateur  :string;
      DateEntretien :Date;
      CandidatId   :number;
      CommenterId :number
      TemplateId :number
  
}
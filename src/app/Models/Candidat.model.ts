import { Base, IBase } from "./Base.model";

export interface ICandidat extends IBase {
    nom: string | null;
    prenom: string | null;
    dateNaissance: string | null;
    civilite: string | null;
    email: string | null;
    telephone: string | null;
    datePremiereExperience: string | null;
    dateDeNaissance: string | null;
    salaireActuel: number | null;
    propositionSalariale: number | null;
    residenceActuelle: string | null;
    emploiEncore: string | null;
    posteId: number;
    poste: string | null;
    posteNiveauId: number;
    niveau: string | null;
    commentaire: string | null;
    imageUrl: string | null;
    cvUrl: string | null;
}

export class Candidat extends Base {
    nom!: string | null;
    prenom!: string | null;
    dateNaissance!: string | null;
    civilite!: string | null;
    email!: string | null;
    telephone!: string | null;
    datePremiereExperience!: string | null;
    dateDeNaissance!: string | null;
    salaireActuel!: number | null;
    propositionSalariale!: number | null;
    residenceActuelle!: string | null;
    emploiEncore!: string | null;
    posteId!: number;
    poste!: string | null;
    posteNiveauId!: number;
    niveau!: string | null;
    commentaire!: string | null;
    imageUrl!: string | null;
    cvUrl!: string | null;
}
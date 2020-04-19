export interface Member {
    memberid: number,
    lastname: string,
    firstname: string,
    email: string,
    password: string, 
    address: string
}

export interface MemberPerView {
    member: Member,
    film_payperview: number
}

export interface MemberSubscribe {
    member: Member,
    membershipprice: number,
	startdate:Date,
	deadline: Date,
}

export const pushMembers = (rows: any[]): Member[]=>{
    let members:Member[] = new Array;
    rows.forEach(row => {
        members.push({memberid: row.membreid, lastname: row.nom, firstname: row.prenom, email: row.adressecourriel, password: row.motdepasse, address: row.adressepostale})
    });
    return members;
}
export enum MemberType{
    PerView, Subscribtion
}
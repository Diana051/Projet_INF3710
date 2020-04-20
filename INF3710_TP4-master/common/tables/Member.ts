export interface Member {
    lastName: string,
    firstName: string,
    email: string,
    password: string, 
    address: string
}

export interface MemberBD {
    memberId: number,
    firstName: string,
    lastName: string,
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
	startDate:Date,
	deadline: Date,
}

export const pushMembers = (rows: any[]): MemberBD[]=>{
    let members:MemberBD[] = new Array;
    rows.forEach(row => {
        members.push({memberId: row.membreid, lastName: row.nom, firstName: row.prenom, email: row.adressecourriel, password: row.motdepasse, address: row.adressepostale})
    });
    return members;
}
export enum MemberType{
    PerView, Subscribtion
}
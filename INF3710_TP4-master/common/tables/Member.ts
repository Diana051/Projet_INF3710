export interface Member {
    memberID: number,
    name: string,
    firstName: string,
    email: string,
    address: string, 
    passeWord: string
}

export interface MemberPerView {
    member: Member,
    pricePerView: number
}

export interface MemberSubscribe {
    member: Member,
    SubscribePrice: number,
	startDate:Date,
	deadline: Date,
}
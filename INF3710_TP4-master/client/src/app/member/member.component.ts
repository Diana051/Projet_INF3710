import { Component} from "@angular/core";
import { Member, MemberSubscribe, MemberPerView} from "../../../../common/tables/Member";
import { CommunicationService } from "./../communication.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})

export class MemberComponent {

  public memberType: string;

  public constructor(private communicationService: CommunicationService) {
    this.memberType = "AbonnementMensuel";
  }

  public duplicateError: boolean = false;

  public insertMember(name: string, firstName: string, email: string, address: string, passeWord: string,
                      filmPrice?: number, subscribePrice?: number, startDate?: Date, deadline?: Date): void {
    const member: Member = {
      "name": name,
      "firstName": firstName,
      "email": email,
      "address": address,
      "passeWord": passeWord
    };
    if (this.memberType === "AbonnementMensuel") {

       this.insertMemberAbonnement(member, subscribePrice !== undefined ? subscribePrice : 0, startDate!, deadline!);

    } else if (this.memberType === "PayementAVue") {

     this.insertMemberPerView(member, filmPrice === undefined ? 0 : filmPrice);

    }
  }

  public insertMemberAbonnement(member: Member, subscribePrice: number, startDate: Date, deadline: Date): void {
    const newMember: MemberSubscribe = {
      "member": member,
      "SubscribePrice": subscribePrice,
      "startDate": startDate,
      "deadline": deadline
    };
    this.communicationService.insertMemberAbonnement(newMember).subscribe((res: number) => {
      if (res > 0) {
          this.communicationService.filter("update");
      }
      this.duplicateError = (res === -1);
    });
  }

  public insertMemberPerView(member: Member, filmPrice: number): void {
    const newMember: MemberPerView = {
      "member": member,
      "pricePerView": filmPrice
    };
    this.communicationService.insertMemberPerView(newMember).subscribe((res: number) => {
      if (res > 0) {
          this.communicationService.filter("update");
      }
      this.duplicateError = (res === -1);
    });
  }

  public changeType(value: string): void {
    this.memberType = value ;
  }
}

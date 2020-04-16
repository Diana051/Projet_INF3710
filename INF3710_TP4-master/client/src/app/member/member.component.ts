import { Component } from "@angular/core";
import { Member} from "../../../../common/tables/Member";
import { CommunicationService } from "./../communication.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})

export class MemberComponent {

  public constructor(private communicationService: CommunicationService) { }

  public duplicateError: boolean = false;

  public insertMember(memberID: number, name: string, firstName: string, email: string, address: string, passeWord: string): void {
    const newMember: Member = {
      "memberID": memberID,
      "name": name,
      "firstName": firstName,
      "email": email,
      "address": address,
      "passeWord": passeWord
    };
    this.communicationService.insertMember(newMember).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }
}

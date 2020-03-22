import { Component, OnInit } from "@angular/core";
import { SubdomainService } from "../subdomain.service";

@Component({
  selector: "app-question-one",
  templateUrl: "./question-one.page.html",
  styleUrls: ["./question-one.page.scss"]
})
export class QuestionOnePage implements OnInit {
  locationLabel: string;

  constructor(private subdomainService: SubdomainService) {}

  ngOnInit() {
    this.locationLabel = this.subdomainService.getLabelForSubdomain();
  }
}

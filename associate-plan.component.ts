import { Component, OnInit } from '@angular/core';
import { PlanDetails } from './model/PlanDetails';
import { AssociatePlanService } from './service/associatePlan.service';

@Component({
  selector: 'rlg-onboarding-associate-plan',
  templateUrl: './associate-plan.component.html',
  styleUrls: ['./associate-plan.component.css']
})

export class AssociatePlanComponent implements OnInit {
  associatePlans: PlanDetails;
  currentInputFilePath;
  currentInputFileIndex;
  currentFile: File;
  associateID: string;
  courseCode: string;

  constructor(private associatePlanService: AssociatePlanService) { }

  ngOnInit() {
    this.getPlanDetails();
  }

  private getPlanDetails() {
    this.associatePlanService.getUserInfo().subscribe((response: any) => {
      const object = response.UserProfileProperties
        .reduce((obj, item) => Object.assign(obj, { [item.Key]: item.Value }), {});
      this.associatePlanService.getSummary(object.Alias).subscribe(model => {
        this.associatePlans = model.value;
        this.associatePlans.Date = new Date(model.value.Date);
      });
    }, error => {
      console.log(error);
    });
  };

  onFileSelected(event, associateplan, index) {
    this.currentInputFilePath = null;
    this.currentInputFileIndex = null;
    if (event.target.files.length > 0) {
      associateplan.filePath = event.target.files[0].name;
      this.currentInputFileIndex = index;
      this.currentInputFilePath = event.target.files[0].name;
      this.currentFile = event.target.files[0];
    }
  }

  uploadFileToCourse(e, associateplan: PlanDetails) {
    const reader = new FileReader();
        debugger;
        reader.readAsArrayBuffer(e.target.files[0]);
        const data = reader.result;

    this.associatePlanService.uploadFile(e.target.files[0],associateplan.ID,data);
  }

  updateCompletionDate(associateplan: PlanDetails) {
    debugger;
    const id = associateplan.ID;
    this.associatePlanService.uploadDate(id, associateplan.CompletionDate);
  }

}
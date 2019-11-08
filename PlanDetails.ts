export interface IPlanDetails {
    AssociateID:string,
    Week:string,
    Day: string,
    Date:Date,
    CourseCode:string,
    CourseTitle:string,
    DocumentType:string,
    ReferenceUrl:string,
    CourseType:string,
    CompletionDate:Date,
    ID:number
}

export class PlanDetails implements IPlanDetails {

    constructor(
        public AssociateID: string,
        public Week: string,
        public Day: string,
        public Date: Date,
        public CourseCode: string,
        public CourseTitle: string,
        public DocumentType: string,
        public ReferenceUrl:string,
        public CourseType:string,
        public CompletionDate:Date,
        public ID:number
        ) {
    }
}

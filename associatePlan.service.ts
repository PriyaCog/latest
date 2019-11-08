import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { PlanDetails } from '../model/PlanDetails';

@Injectable()
export class AssociatePlanService {
    userInfo: any;
    formDigestDetail: any;
    constructor(private httpClient: HttpClient) {
    }

    getSummary(associateID: string): Observable<any> {
        var apiURL = `https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('PlanDetails')/items?$filter=AssociateID eq ${associateID}`;
        return this.httpClient.get(apiURL).pipe(map((response: any) => {
            return of(response.value);
        }));
    }

    getUserInfo() {
        const siteUrl = "https://cognizantonline.sharepoint.com/_api/SP.UserProfiles.PeopleManager/GetMyProperties";
        return this.httpClient.get(siteUrl);
    }

    uploadFile(file: any, id: number, data: any) {
        let listName = "PlanDetails";
        var itemType = this.getItemTypeForListName(listName);
        let option = {
            "accept": "application/json;odata=verbose",
            "contentType": "text/xml"
        };
        var item = {
            "__metadata": { "type": itemType }
        };

        var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/contextinfo";
        this.httpClient.post(siteUrl, option).subscribe((response: Response) => {
            this.formDigestDetail = response;
            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json;odata=verbose',
                "X-HTTP-Method": "MERGE",
                "If-Match": "*",
                "X-RequestDigest": this.formDigestDetail.FormDigestValue
            });
            let options = {
                headers: httpHeaders,
            };

            const siteUrl = `https://cognizantonline.sharepoint.com/sites/ukInsurance/FNZ/_api/lists/
        getbytitle(${listName})/items(${id})/AttachmentFiles/add(FileName='${file.name}')"`;
            debugger;
            return this.httpClient.post<any>(siteUrl,data, options).subscribe(
                (response: Response) => {
                    debugger;
                    return response.json();
                }
            );
        });

    }

    public getItemTypeForListName(name) {
        return "SP.Data." + name.charAt(0).toUpperCase() + name.slice(1) + "ListItem";
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server Error');
    }

    uploadDate(id: number, completionDate: Date) {
        let listName = "PlanDetails";
        var itemType = this.getItemTypeForListName(listName);
        let option = {
            "accept": "application/json;odata=verbose",
            "contentType": "text/xml"
        };
        var item = {
            "__metadata": { "type": itemType },
            "CompletionDate": completionDate,
        };

        var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/contextinfo";
        this.httpClient.post(siteUrl, option).subscribe((response: Response) => {
            this.formDigestDetail = response;
            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json;odata=verbose',
                "X-HTTP-Method": "MERGE",
                "If-Match": "*",
                "X-RequestDigest": this.formDigestDetail.FormDigestValue
            });
            let options = {
                headers: httpHeaders,
            };

            var siteUrl = `https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('PlanDetails')/items(${id})`;
            return this.httpClient.post<any>(siteUrl, JSON.stringify(item), options).subscribe(
                (response: Response) => {
                    debugger;
                    return response.json();
                }
            );
        });

    }

}

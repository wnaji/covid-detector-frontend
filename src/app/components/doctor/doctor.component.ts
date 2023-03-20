import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/pdf.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})

export class DoctorComponent implements OnInit {
  nbrQrCodes: number = 1;
  qrCodes: Array<object> = [];
  doctorId: any = JSON.parse(localStorage.getItem("account") || '').doctor.id;

  constructor(private http: HttpClient, private pdfService: PdfService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onKey(event: any) { // without type info
    this.nbrQrCodes = event.target.value;
  }

  generatePdf(): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem("token") || ''
    });
    let options = { headers: headers };

    this.http.post<[]>(environment.serverUrl+'doctors/qrcodes', {"amount":this.nbrQrCodes}, options)
    .subscribe(
      (response) => {
        for (let index = 0; index < response.length; index++) {
          const element = { qr:`${JSON.stringify({id: response[index], type: 'doctor' })}`, foreground: 'black', background: 'white', fit: 500 };          
          this.qrCodes.push(element);
        }    

        this.pdfService.generatePdf(this.qrCodes);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
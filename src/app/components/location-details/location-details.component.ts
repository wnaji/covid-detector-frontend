import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PdfService } from 'src/app/pdf.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  @Input() locationsList! : MatTableDataSource<any>;
  displayedColumns : Array<String>;
  //valueQrCode;
  elementType;

  constructor(private pdfService: PdfService) {
    this.displayedColumns = ["id", "nom", "description", "code"];
    this.elementType = "img";
    //this.valueQrCode = JSON.stringify({id: 'azerty', type: 'location'});
   }

  ngOnInit(): void {
  }

  getQrcode(event: any){    
    this.pdfService.generatePdf({image: event.target.src});
  }

  generatePDF() {
    const pdfContent: Array<object> = [];

    for (let index = 0; index < this.locationsList.filteredData.length; index++) {
      const element = this.locationsList.filteredData[index];
      pdfContent.push({ qr: element.id, foreground: 'black', background: 'white', fit: 500 });
    }

    console.log("pdfContent", pdfContent);

    this.pdfService.generatePdf(pdfContent);
  }
}

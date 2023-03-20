import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { MatTableDataSource } from '@angular/material/table';
import { PdfService } from 'src/app/pdf.service';
import { LocationDetailsComponent } from '../location-details/location-details.component'

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})

export class EstablishmentComponent implements OnInit {
  locations: any;
  loading;

  constructor(private establishmentService: EstablishmentService, private pdfService: PdfService) {
    this.locations = [];
    this.loading = false;
  }

  ngOnInit(): void {
    this.getLocations();
  }

  addLocation(form: NgForm) {
    this.loading = true;
    const rep = this.establishmentService.createLocation(form.value.location_name, form.value.location_description)
    form.reset()
    rep.then((response) => {
      this.loading = false;
      this.getLocations()
    })
  }

  getLocations() {
    this.establishmentService.getLocations().subscribe((response: any) => {
      this.locations = new MatTableDataSource<any>(response)
    })
  }

}
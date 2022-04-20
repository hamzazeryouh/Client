import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kt-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {


  @Input() src: string = '';

  
  constructor() { }

  ngOnInit(): void {
  }

}

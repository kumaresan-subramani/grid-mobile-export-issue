import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from './datasource';
import {
  GridComponent, ToolbarItems, ToolbarService, ExcelExportService, PdfExportService,
  ExcelExportCompleteArgs, PdfExportCompleteArgs
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public data?: object[];
  public toolbarOptions?: ToolbarItems[];
  @ViewChild('grid') public grid?: GridComponent;
  public exportBlob = (blob: Blob) => {
    console.log(blob)
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url: string = (window.URL as any).createObjectURL(blob); // Fix the typo here
    a.href = url;
    a.download = 'Export';
    a.click();
    (window.URL as any).revokeObjectURL(url); // Fix the typo here
    document.body.removeChild(a);
  }


  ngOnInit(): void {
    this.data = data;
    this.toolbarOptions = ['PdfExport', 'ExcelExport'];
  }

  toolbarClick(args: ClickEventArgs) {
    if ((args as any).item.id === 'Grid_pdfexport') {
      (this.grid as any).pdfExport(null, null, null, true);
    }
    if ((args as any).item.id === 'Grid_excelexport') {
      (this.grid as any).excelExport(null, null, null, true);
    }
  }

  excelExpComplete(args: ExcelExportCompleteArgs) {
    // This event will be triggered when excel exporting.
    (args as any).promise.then((e: { blobData: Blob }) => {
      // In this `then` function, we can get blob data through the arguments after promise resolved.
      this.exportBlob(e.blobData);
    });
  }

  pdfExpComplete(args: PdfExportCompleteArgs) {
    // This event will be triggered when pdf exporting.
    (args as any).promise.then((e: { blobData: Blob }) => {
      // In this `then` function, we can get blob data through the arguments after promise resolved.
      this.exportBlob(e.blobData);
    });
  }
}

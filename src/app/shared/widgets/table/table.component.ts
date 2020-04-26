import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement, DashboardService } from 'src/app/modules/dashboard.service';

@Component({
  selector: 'app-widget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  defaultPageIndex: number = 0;
  defaultPageSize: number = 5;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.getData(pageEvent);

    this.dataSource.paginator = this.paginator;
  }

  getData(event: PageEvent) {
    var result = this.dashboardService.getTableData(0, 5);
    this.paginator.length = result.length;
    this.paginator.pageIndex = result.pageIndex;
    this.paginator.pageSize = result.pageSize;
    this.dataSource = new MatTableDataSource<PeriodicElement>(result.data);
  }
}
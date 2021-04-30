import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent implements OnInit {

  @Input() totalCount: number;
  @Input() pageNumber: number;
  @Input() pageSize: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}

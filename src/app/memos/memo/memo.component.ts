import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { memo } from 'src/app/Models/memo';
import { MemoService } from 'src/app/services/memo.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MemoComponent implements OnInit, OnDestroy {
  memosArray: memo[] = [];

  constructor(private service: MemoService) {}

  ngOnInit(): void {
    this.getMemos();
  }

  ngOnDestroy(): void {}

  deleteMemo(item: any) {
    this.service.deleteMemo(item.id).subscribe(res => {
      this.getMemos();
    });
  }

  getMemos() {
    this.service.getMemos().subscribe((data) => {
      this.memosArray = data;
    });
  }

}

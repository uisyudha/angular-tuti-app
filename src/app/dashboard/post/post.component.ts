import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  dataType: string;

  radioDataType = [
    'Text',
    'Gambar',
  ];

  constructor() { }

  ngOnInit() {

  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  open() {
    console.log('Ouvrir ce post dans le navigateur')
  }

}

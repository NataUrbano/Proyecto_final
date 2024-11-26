import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../home/footer/footer.component';
import { HeaderComponent } from '../home/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone:true,
  imports:[FooterComponent, HeaderComponent, RouterOutlet],
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

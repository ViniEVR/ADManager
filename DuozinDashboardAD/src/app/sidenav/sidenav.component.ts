import { Component, EventEmitter, Output, OnInit, HostListener, } from '@angular/core';
import { navbarData } from './nav-data';
import { ElementRef } from '@angular/core';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  constructor(private elementRef: ElementRef) { }
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
    }
  }

  ngOnInit(): void{
    this.screenWidth = window.innerWidth;
  }


  currentImage = 'assets/img/Logos/sideNav.png';

  toggleCollapse(): void {
    if(this.currentImage == 'assets/img/Logos/sideNavCollapsed.png'){
      this.currentImage = 'assets/img/Logos/sideNav.png';
    }else{
      this.currentImage = 'assets/img/Logos/sideNavCollapsed.png'
    }
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void{
    this.currentImage = 'assets/img/Logos/sideNav.png';
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  
changeImage() {
    
}
}

import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'dang-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ng-scrollspy-toc';
  private _actives:{[id:string]: boolean} = {};
  private observer: IntersectionObserver;
  constructor() {
      
  }

  ngAfterViewInit() {
    const options = {
      rootMargin: '0px 0px 20px 0px'
    }
    this.observer = new IntersectionObserver(entries => {
      console.log(entries.map(entry => ({id: entry.target.getAttribute('id'), ratio: entry.intersectionRatio})))
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const ratio = entry.intersectionRatio;
        if (ratio > 0) {
          this._actives[id] = true;
        } else {
          this._actives[id] = false;
        }
      })
    }, options);  
    // TODO: replace this with directive
    document.querySelectorAll('section[id').forEach(section => {
      this.observer.observe(section);
    })
  }

  public isActive(id:string) {
    return !!this._actives[id];
  }
}

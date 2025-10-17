import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-home',
  imports: [],
  templateUrl: './candidate-home.component.html',
  styleUrl: './candidate-home.component.css'
})
export class CandidateHomeComponent {
  constructor(private router: Router) {}
  goTo(path: string) {
    this.router.navigate([path]);
  }
  ngOnInit() {
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

}

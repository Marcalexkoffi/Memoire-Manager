import { Component, type OnInit, type OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterModule],
})
export class HomeComponent implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initScrollAnimations();
    this.animateProgressBar();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Navigation methods
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToAbout(): void {
    this.router.navigate(['/about']);
  }

  // Smooth scroll to section
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Initialize scroll animations
  private initScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observer les éléments à animer après le rendu
    setTimeout(() => {
      const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .service-item'
      );
      elementsToAnimate.forEach((el) => this.observer.observe(el));
    }, 100);
  }

  // Animate progress bar
  private animateProgressBar(): void {
    setTimeout(() => {
      const progressFill = document.querySelector(
        '.progress-fill'
      ) as HTMLElement;
      if (progressFill) {
        progressFill.style.width = '0%';
        setTimeout(() => {
          progressFill.style.width = '78%';
        }, 500);
      }
    }, 1000);
  }

  // Toggle mobile menu
  toggleMobileMenu(): void {
    const navbarNav = document.querySelector('.navbar-nav') as HTMLElement;
    if (navbarNav) {
      navbarNav.classList.toggle('mobile-open');
    }
  }
}

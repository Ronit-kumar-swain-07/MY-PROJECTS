import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  today = new Date();

  adminName = "Administrator";

  darkMode = false;

  ngOnInit(): void {

    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {

      this.darkMode = true;

      document.body.classList.add('dark-theme');

    }

  }

  toggleTheme() {

    this.darkMode = !this.darkMode;

    if (this.darkMode) {

      document.body.classList.add('dark-theme');

      localStorage.setItem('theme', 'dark');

    } else {

      document.body.classList.remove('dark-theme');

      localStorage.setItem('theme', 'light');

    }

  }

}
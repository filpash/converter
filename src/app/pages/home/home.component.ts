import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/pages/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  loggedUserName!: string;

  constructor(private credentialsService: CredentialsService) {}

  ngOnInit() {}

  get username(): string | null {
    return this.credentialsService.username;
  }
}

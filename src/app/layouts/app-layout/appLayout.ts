import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/ui/navbar/navbar";
import { RouterModule } from "@angular/router";
import { Chatbot } from "src/app/features/chatbot/chatbot";
import { Footer } from '@shared/components/ui/footer/footer';

@Component({
  selector: 'app-app-layout',
  imports: [RouterModule, Navbar, Chatbot, Footer],
  templateUrl: './appLayout.html',
  styleUrl: './appLayout.scss',
})
export class AppLayout {}

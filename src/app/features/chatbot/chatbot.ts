
import { Component, inject, OnInit, ViewChild,ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../core/services/google.service';
import { Drawer } from "primeng/drawer";
import { Button } from "primeng/button";
import { HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
interface Msg {
  text: string;
  sender: 'user' | 'bot';
}
@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule, Drawer, Button,TranslateModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class Chatbot implements OnInit {
    private gemini=inject(GeminiService) 
   private translate=inject(TranslateService)
   private cdr = inject(ChangeDetectorRef);
   
  
  messages: Msg[] = [];
  userInput = '';
  sending= false;
  chatVisible = false;
  isOpen = false;
  welcomeShown = false;
placeholderText = signal<string>('Default Placeholder');

  
   floatingBtnText!: string;
  isMobile = window.innerWidth < 640;


 


  @ViewChild('drawerRef') drawerRef!: Drawer;
    Visiable=false;

  ngOnInit(): void {


     this.floatingBtnText = this.translate.instant('Chatbot.HeyAskMe');
 
     this.adjustPositions();
   this.updateTexts();

 
  this.translate.onLangChange.subscribe(() => {
    this.updateTexts();
    this.cdr.detectChanges();
  });

 
}
sendWelcomeMessage() {
  const message = this.translate.instant('Chatbot.WelcomeMessage');
  this.simulateBotTyping(message);
}

updateTexts() {
  this.floatingBtnText = this.translate.instant(
    this.isOpen ? 'Chatbot.TapToClose' : 'Chatbot.HeyAskMe'
  );

  this.placeholderText = this.translate.instant('Chatbot.AskMeAnything');
  }
  // floating div
    floatingDivStyle: any = {
    bottom: '142px',
    right: '30px',
    position: 'fixed',
  };

chatWindowStyle = {
  bottom: '0px',
  right: '80px',
  position: 'fixed',
  height: '420px', 
};

toggleChat() {
  this.chatVisible = !this.chatVisible;
this.isOpen = !this.isOpen;
    this.floatingBtnText = this.isOpen ? this.translate.instant('Chatbot.TapToClose')
  : this.translate.instant('Chatbot.HeyAskMe');
//Shown the welcome message when open the chatbot
  if (this.chatVisible && !this.welcomeShown) {
    this.sendWelcomeMessage();
    this.welcomeShown = true;
  }

  if (this.chatVisible) {
    // Opening chat
    setTimeout(() => {
      const chatEl = document.querySelector('.chat') as HTMLElement;
      if (chatEl) {
        const rect = chatEl.getBoundingClientRect();
        this.floatingDivStyle = {
          bottom: `${window.innerHeight - rect.top + 10}px`, // above chat chat
          left: `${rect.left + rect.width / 2}px`, // center the chat
          transform: 'translateX(-50%)',
          position: 'fixed'
        };
      }
    }, 50); 
  } else {
    // Return to orginal position
    this.floatingDivStyle = {
      bottom: '142px',
      right: '30px',
      position: 'fixed'
    };
  }
}

// Resize
@HostListener('window:resize')
onResize() {
  if (this.chatVisible) {
    const chatEl = document.querySelector('.chat') as HTMLElement;
    if (chatEl) {
      const rect = chatEl.getBoundingClientRect();
      this.floatingDivStyle.bottom = `${window.innerHeight - rect.top + 10}px`;
      this.floatingDivStyle.left = `${rect.left + rect.width / 2}px`;
    }
  }
}


adjustPositions() {
  const screenH = window.innerHeight;

  if (screenH < 700) {
    // Small screen
    this.chatWindowStyle.height = '100%';
  } else {
    // Desktop
    this.chatWindowStyle.height = '50%';
  }
}

  async sendMessage() {
    const message = this.userInput.trim();
    if (!message) return;
    this.messages.push({ text: message, sender: 'user' });
    this.sending = true;
    this.userInput = '';

    try {
      const reply = await this.gemini.sendMessage(message);
      await this.simulateBotTyping(reply);
    } catch (err) {
      console.error(err);
      await this.simulateBotTyping('Error on Gemini');
    } finally {
      this.sending = false;
      this.scrollToBottom();
    }
  }

  async simulateBotTyping(text: string) {
    const typingDelay = 50; // ms per character
    let currentText = '';
    const placeholderMsg: Msg = { text: '', sender: 'bot' };
    this.messages.push(placeholderMsg);
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      placeholderMsg.text = currentText;
      this.scrollToBottom();
      await new Promise(res => setTimeout(res, typingDelay));
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const container = document.getElementById('chat-container');
      if (container) container.scrollTop = container.scrollHeight;
    }, 50);
  }
}

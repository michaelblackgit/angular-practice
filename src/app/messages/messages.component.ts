import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  /* Message must be public because it will be bound to
    this component and Angular only binds to public
    properties. */
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}

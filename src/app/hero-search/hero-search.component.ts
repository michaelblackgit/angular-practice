import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {

  private heroes$: Observable<Hero[]>;
  /* A subject is both a source of observable values and an
    Observable itself. You can subscribe to a Subject as you
    would any Observable. You can also push values into that
    Observable by calling its next(value) method as the search()
    method does. The search method is called via an event binding to the
    textbox's keystroke event. */
  private searchTerms = new Subject<string>();

  // tried to intialize heroes$ to an empty array here but it
  // did not work. check up on this later.
  constructor(private heroService: HeroService) { }

  private search(term: string): void {
    this.searchTerms.next(term);
  }

  /* swithMap() calls the search service for each search term that makes
    it through debounce and distinctUntilChanged. It cancels and discards
    previous search observables, returning only the latest search service
    observable. switchMap() preserves the original request ordering while
    returning only the observable from the most recent HTTP method call.
    Results from prior calls are canceled and discarded. */
  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router'; // To access route.
import { Location } from '@angular/common'; // Used to go back to prev. route.
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  /* route.snapshot is a static image of the route information shortly
    after the component was created. The paramMap is a dictionary
    of route parameter values extracted from the URL. The "id" key
    returns the id of the hero to fetch. Routes are always strings,
    so the '+' operator is used to convert the strng into the number
    value we need. */
  private getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  private goBack(): void {
    this.location.back();
  }

  private save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}

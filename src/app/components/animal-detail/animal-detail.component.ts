import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AnimalDetail, AnimalsService } from 'src/app/services/animals.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {

  image$: Observable<AnimalDetail> | null = null;

  constructor(private route: ActivatedRoute,
    private animalService: AnimalsService,
    private location: Location) {
    }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;

    this.image$ = this.animalService.getAnimalDetail(id);
  }


  goBack(): void {
    this.location.back();
  }
}

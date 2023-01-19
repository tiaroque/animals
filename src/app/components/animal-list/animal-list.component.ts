import { Component, OnInit } from '@angular/core';
import { AnimalDetail, AnimalInfo, AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {

  itemCount = 6;
  animalItems: AnimalInfo | null = null;
  animalDisplayList: AnimalDetail[] = []

  constructor(private animalService: AnimalsService) { }

  ngOnInit(): void {

    this.animalService.getAnimalsList()
      .subscribe(data => {
     
        this.animalItems = data;
        this.fillDisplayList();
      })
  }

  trackList(index: number, animal: AnimalDetail) {
    return animal.id;
  }

  updateCards() {

    this.animalService.itemNum+=this.itemCount;

    this.fillDisplayList();

    if(this.animalDisplayList.length === 0) {
      this.animalService.itemNum = 0;
      this.fillDisplayList();
    }
  }

  fillDisplayList() {
    let start = this.animalService.itemNum;
    let end = start + this.itemCount

    this.animalDisplayList = this.animalItems!.items
      .slice(start, end)
  }

}

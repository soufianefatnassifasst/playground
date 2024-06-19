import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpMocksService} from "../http-mocks.service";
import {forkJoin, Subscription} from "rxjs";
import {ConsommationDto, IdContrat} from "../domain";
import {NgForOf, NgIf} from "@angular/common";
import { WaitComponent } from '../wait/wait.component';
import {CacheService} from "../cache.service";

@Component({
  selector: 'app-fonctionnalite',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    WaitComponent
  ],
  templateUrl: './fonctionnalite.component.html',
  styleUrl: './fonctionnalite.component.scss'
})
export class FonctionnaliteComponent implements OnInit, OnDestroy {
  consommations: { idContrat: IdContrat, consommation: ConsommationDto }[] = [];
  private subscriptions: Subscription[] = [];
  loading: boolean = true;
  totalPuissance: number = 0;

  constructor(private httpMocksService: HttpMocksService, private cacheService: CacheService) {
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.cacheService.fetchOrSetCache('contrats', this.httpMocksService.getContrats()).subscribe(
        contrats => {
          const requests = contrats.map(id =>
            this.cacheService.fetchOrSetCache(`consommation_${id}`,
              this.httpMocksService.getConsommation(id)));

          forkJoin(requests).subscribe(
            consommations => {
              this.consommations = contrats.map((id, index) => ({
                idContrat: id,
                consommation: consommations[index]
              }));
              this.calculateTotalPuissance();
              this.loading = false;
            },
            error => {
              console.error('Erreur lors de la récupération des consommations : ', error);
              this.loading = false;
            }
          );
        },
        error => {
          console.error('Erreur lors de la récupération des contrats : ', error);
          this.loading = false;
        }
      )
    );
  }

  private calculateTotalPuissance() {
    this.totalPuissance = this.consommations.reduce((total, item) => {
      return total + item.consommation.relevés.reduce((subTotal, releve) => subTotal + releve.pwr, 0);
    }, 0);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

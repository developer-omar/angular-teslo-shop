import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@products/components/product-card/product-card';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  gender = toSignal(this.activatedRoute.params.pipe(map(({ gender }) => gender)));
  productsResource = rxResource({
    params: () => ({
      gender: this.gender(),
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({ gender: params.gender });
    },
  });
}

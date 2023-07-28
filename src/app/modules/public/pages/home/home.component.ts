import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { CategoryService } from 'src/app/modules/private/admin/components/blog/services/category.service';
import { PostService } from 'src/app/modules/private/admin/components/blog/services/post.service';
import { DepoimentosService } from 'src/app/modules/private/admin/components/depoimentos/services/depoimentos.service';
import { EditThemeService } from 'src/app/modules/private/admin/components/edit-theme/services/edit-theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post>;
  categorias$: Observable<any>;
  banners$: Observable<any>;
  depoimentos$: Observable<any>;
  backgroundDepoimentos = [];
  home = [];

  constructor(
    private postsService: PostService,
    private categoriasService: CategoryService,
    private editThemeService: EditThemeService,
    private depoimentosService: DepoimentosService
    ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();
    this.categorias$ = this.categoriasService.getAllCategorias();
    this.banners$ = this.editThemeService.getAllBanners();
    this.depoimentos$ = this.depoimentosService.getAllDepoimentos();
    this.depoimentosService.getFundoDepoimentos().subscribe(fundo => {
      if(fundo) { this.backgroundDepoimentos = fundo; }
    })
    this.editThemeService.getAllDadosHome().subscribe(home => {
      this.home = home;
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: false,
    autoWidth: true,
    navText: ['<i class="bx bxs-chevron-left"></i>', '<i class="bx bxs-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  customOptionsTestimony: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

}

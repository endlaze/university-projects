import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { AuctionService } from '../../services/auction-service/auction.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.less']
})
export class CreateAuctionComponent implements OnInit {

  auctionForm: FormGroup;
  currentRole;
  currentAlias;
  categories;
  subCategories;
  stockCat;
  category;
  subCategory;
  conTarjeta;

  constructor(private formBuilder: FormBuilder,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private auctionService: AuctionService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.currentRole = this.storage.get('current-user').role;
    this.currentAlias = this.storage.get('current-user').alias;
    this.conTarjeta = this.storage.get('current-user').conTarjeta
    this.auctionService.getCategories('/allCategories')
      .subscribe(cat => {
        this.stockCat = cat;
        this.categories = Array.from(new Set(this.stockCat.map(x => x.Categoria)))
      }, () => console.log('No se pudo recuperar los usuarios de la base de datos', 'Error'))

    this.auctionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      finalDate: ['', Validators.required],
      basePrice: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required]
    });
  }

  updateSubCategories = () => {
    const result = [];
    const map = new Map();
    for (const item of this.stockCat) {
      if (!map.has(item.IdSubcategoria) && item.Categoria === this.form.category.value) {
        map.set(item.IdSubcategoria, true);
        result.push({
          IdSubcategoria: item.IdSubcategoria,
          Subcategoria: item.Subcategoria
        });
      }
    }
    this.subCategories = result
  }

  get form() { return this.auctionForm.controls; }

  onSubmit() {
    let auction = {
      Alias: this.currentAlias,
      Nombre: this.form.name.value,
      PrecioBase: this.form.basePrice.value,
      FechaFinal: this.form.finalDate.value,
      Descripcion: this.form.description.value,
      Foto: "NULL",
      IdSubcategoria: this.form.subCategory.value,
      Rol: this.currentRole
    };
    if (this.auctionForm.invalid)
      return;

    if (!this.conTarjeta) {
      this.toastr.error('El usuario no tiene una tarjeta asociada')
      this.router.navigate(['/auctions'])
    }

    this.auctionService.createAuction(auction).subscribe((auction) => {
      this.router.navigate(['/auctions']);
    }, () => console.log('No se pudo publicar la subasta en la base de datos', 'Error'));
  }
}


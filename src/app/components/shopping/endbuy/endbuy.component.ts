import { Component, OnInit} from '@angular/core';


//dependencias para traer datos de productos
import {DataApiService} from '../../../services/data-api.service';
import {ProductInterface} from '../../../models/product-interface';
import { AuthService } from 'src/app/services/auth.service';
import { BuysInterface } from 'src/app/models/buys-inteface';



@Component({
  selector: 'app-endbuy',
  templateUrl: './endbuy.component.html',
  styleUrls: ['./endbuy.component.css']
})
export class EndbuyComponent implements OnInit {

  public precios:number[] = [];
  
  
  rta:number = 0;
  contador:number;
  total:number;
  operacion(cont:number){
    //this.contador = cont;
    const sum = cont;
    this.precios.push(sum)
    //this.rta= this.contador+this.rta;
    //this.precios.push(this.contador);
    //console.log('se agrego un producto');
  }

  operacion2(){
    //for(var index in this.precios){   
    console.log(this.precios.length);
    console.log(this.contador);
    
    this.total = this.precios.reduce((
      acc,
      obj,
    ) => acc + (obj)
    );
    console.log("Total: ", this.total)

    //for(var i = 0; i < this.precios.length; i=4){ 
      //console.log(fruits[i]); // output: Apple Orange Banana
      //console.log(this.precios[0]);  
    //}  
      //console.log(this.precios[0]);  
      //this.rta = this.rta+this.precios[index];
    //}
  }

  

  constructor(public dataApiService: DataApiService, public authService: AuthService) { }

  public buys: BuysInterface;
  public products: ProductInterface;

  public listProducts:Array<any> = []
  ngOnInit() {
    
    this.getListBuys();
    this.getListProducts();
    

  }

  getListBuys(){
    this.dataApiService.getIdUserBuys().subscribe((buys: BuysInterface) => (this.buys = buys));
  }

  onDeleteBuy(id: string): void {
    if (confirm('¿esta seguro que quiere eliminar este producto?')) {
      this.dataApiService.deleteBuy(id).subscribe();
    }
  }
  
  getListProducts():void{
    this.dataApiService.getAllProducts()
    .subscribe((products:ProductInterface)=>(this.products=products));
  }
  
  

  
  
}

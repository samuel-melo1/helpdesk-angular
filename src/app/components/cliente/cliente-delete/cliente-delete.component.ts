import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente-service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(private service: ClienteService, 
              private toastr: ToastrService, 
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.findById(); 
  }

  findById(): void{
    this.service.findById(this.cliente.id).subscribe(response =>{
      response.perfis = []
      this.cliente = response; 
    })
  }

  delete(): void{
    this.service.delete(this.cliente.id).subscribe(() => {
      this.toastr.success('Técnico deletado com sucesso!', 'Delete');
      this.router.navigate(['clientes'])
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toastr.error(element.message); 
        });
      }else{
        this.toastr.error(ex.error.message);
      }
    })
  }

}

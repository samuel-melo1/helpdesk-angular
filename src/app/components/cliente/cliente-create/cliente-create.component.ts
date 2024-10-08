import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente-service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }


  nome = new FormControl(null, Validators.minLength(3));
  cpf = new FormControl(null, Validators.required);
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private service: ClienteService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }


  create(): void{
    this.service.create(this.cliente).subscribe(() => {
      this.toastr.success('Cliente cadastrado com sucesso!', 'Cadastro');
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

  addPerfil(perfil: any):void{
    if(this.cliente.perfis.includes(perfil)){
      this.cliente.perfis.splice( this.cliente.perfis.indexOf(perfil), 1); 
    }else{
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos(){
    return this.cpf.valid && this.email.valid && this.nome.valid && this.senha.valid; 
  }

}

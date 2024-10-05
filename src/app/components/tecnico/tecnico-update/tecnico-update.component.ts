import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
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

  constructor(private service: TecnicoService, 
              private toastr: ToastrService, 
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.findById(); 
  }

  findById(): void{
    this.service.findById(this.tecnico.id).subscribe(response =>{
      response.perfis = []
      this.tecnico = response; 
    })
  }

  update(): void{
    this.service.update(this.tecnico).subscribe(() => {
      this.toastr.success('Técnico atualizado com sucesso!', 'Update');
      this.router.navigate(['tecnicos'])
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
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice( this.tecnico.perfis.indexOf(perfil), 1); 
    }else{
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCampos(){
    return this.cpf.valid && this.email.valid && this.nome.valid && this.senha.valid; 
  }

}

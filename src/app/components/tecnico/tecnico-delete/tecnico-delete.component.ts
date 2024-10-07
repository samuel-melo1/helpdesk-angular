import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

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

  delete(): void{
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.toastr.success('Técnico deletado com sucesso!', 'Delete');
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

}

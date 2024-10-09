import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente-service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {

    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '', 
    nomeCliente: '',
    nomeTecnico: ''
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status:     FormControl = new FormControl(null, [Validators.required])
  titulo:     FormControl = new FormControl(null, [Validators.required])
  observacoes:  FormControl = new FormControl(null, [Validators.required])
  tecnico:    FormControl = new FormControl(null, [Validators.required])
  cliente:    FormControl = new FormControl(null, [Validators.required])

  constructor(private chamadoService: ChamadoService,  
              private clienteService: ClienteService, 
              private tecnicoService: TecnicoService,
              private toastr: ToastrService, 
              private router: Router, 
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.activateRoute.snapshot.paramMap.get('id')
    this.findById(); 
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void{
      this.chamadoService.findById(this.chamado.id).subscribe(response => {
        this.chamado = response; 
      }, ex => {
        this.toastr.error(ex.error.error); 
      })
  }


  update(): void{
    this.chamadoService.update(this.chamado).subscribe(response => {
      this.toastr.success('Chamado atualizado com sucesso', 'Atualizar Chamado'); 
      this.router.navigate(['chamados'])
    }, ex => {
      this.toastr.error(ex.error.error);
    })
  }

  findAllClientes(): void{
    this.clienteService.findAll().subscribe(response => {
      this.clientes = response; 
    })
  }

  findAllTecnicos(): void{
    this.tecnicoService.findAll().subscribe(response => {
      this.tecnicos = response; 
    })
  }

  retornaStatus(status: any): string {
    if(status == '0'){
      return 'ABERTO';
    }else if(status == '1'){
      return 'EM ANDAMENTO';
    }else {
      return 'ENCERRADO';
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0'){
      return 'BAIXA';
    }else if(prioridade == '1'){
      return 'MÉDIA';
    }else {
      return 'ALTA';
    }
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid && this.titulo.valid && 
           this.observacoes.valid &&  this.tecnico.valid && this.cliente.valid; 
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LivroService } from '../services/livro.service';
import { Livro } from '../model/livro.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importando o módulo de formulário
import { MatInputModule } from '@angular/material/input'; // Importando o módulo de input
import { MatTableModule } from '@angular/material/table'; // Importando o módulo da tabela

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTableModule], // Adicionando os módulos aqui
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
})
export class LivroComponent implements OnInit {
  livros: Livro[] = [];
  livroForm: FormGroup;
  displayedColumns: string[] = ['titulo', 'autor', 'descricao', 'actions'];
  editMode = false;
  selectedLivroId: number | null = null;

  constructor(private livroService: LivroService, private fb: FormBuilder) {
    this.livroForm = this.fb.group({
      titulo: [''],
      autor: [''],
      descricao: [''], // Adicionando o campo descrição aqui
    });
  }

  ngOnInit(): void {
    this.listarLivros();
  }

  listarLivros() {
    this.livroService.listarLivros().subscribe((data) => {
      this.livros = data;
    });
  }

  adicionarLivro() {
    this.livroService.adicionarLivro(this.livroForm.value).subscribe(() => {
      this.livroForm.reset();
      this.listarLivros();
    });
  }

  selecionarLivro(livro: Livro) {
    this.selectedLivroId = livro.id !== undefined ? livro.id : null;
    this.livroForm.patchValue({
      titulo: livro.titulo,
      autor: livro.autor,
      descricao: livro.descricao, // Adicionando o campo descrição ao selecionar
    });
    this.editMode = true;
  }

  atualizarLivro() {
    if (this.selectedLivroId !== null) {
      this.livroService.atualizarLivro(this.selectedLivroId, this.livroForm.value).subscribe(() => {
        this.livroForm.reset();
        this.editMode = false;
        this.selectedLivroId = null;
        this.listarLivros();
      });
    }
  }

  deletarLivro(id: number) {
    this.livroService.deletarLivro(id).subscribe(() => {
      this.listarLivros();
    });
  }

  cancelar() {
    this.livroForm.reset();
    this.editMode = false;
    this.selectedLivroId = null;
  }
}

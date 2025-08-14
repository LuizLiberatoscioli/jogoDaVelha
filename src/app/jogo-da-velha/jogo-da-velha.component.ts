import { Component, OnInit } from '@angular/core';

import { JogoDaVelhaService} from './shared';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css']
})
export class JogoDaVelhaComponent implements OnInit {

  constructor(private jogoDaVelhaService: JogoDaVelhaService) { }

  ngOnInit() {
    this.jogoDaVelhaService.inicializar();
  }

  // retorna se a tela de inicio deve ser exibida
  get showInicio(): boolean{
    return this.jogoDaVelhaService.showInicio;
  }

  get showTabuleiro(): boolean{
    return this.jogoDaVelhaService.showTabuleiro;
  }

  get showFinal(): boolean {
    return this.jogoDaVelhaService.showFinal;
  }

  iniciarJogo(): void{
    this.jogoDaVelhaService.iniciarJogo();
  }

  jogar(posX: number , posY: number): void {
    this.jogoDaVelhaService.jogar(posX, posY);
  }

  exibirX(postX : number , posY: number ): boolean {
    return this.jogoDaVelhaService.exibirX(postX, posY);
  }

  exibirO(postX : number , posY: number ): boolean {
    return this.jogoDaVelhaService.exibirY(postX, posY);
  }

  exibirVitoria(posX: number , posY: number): boolean {
    return this.jogoDaVelhaService.exibirVitoria(posX, posY);
  }


}

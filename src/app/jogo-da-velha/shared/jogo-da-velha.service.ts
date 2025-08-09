import { Injectable } from '@angular/core';

@Injectable()
export class JogoDaVelhaService {

  private readonly TAM_TAB: number = 3;
  private readonly X: number 1;
  private readonly O: number 2;
  private readonly VAZIO: number = 0;

  private tabuleiro: any;
  private numMovimentos: number;
  private vitoria: any;

  private _jogador: number;
  private _showInicio: boolean;
  private _showTabuleiro: boolean;
  private _showFinal: boolean;

  constructor() { }

  // inicializa o jogo , define exibicao da tela inicial.
  

  inicializar(): void {
    this._showInicio = true;
    this._showTabuleiro = false ;
    this._showFinal = false;
    this.numMovimentos = 0 ;
    this._jogador = this.X;
    this.vitoria = false;
    this.inicializarTabuleiro();

  }

  // inicializa o tabuleiro do jogo com vazio para todos as posicoes.

  inicializarTabuleiro (): void {
    this.tabuleiro = [this.TAM_TAB];
    for (let i = 0; i < this.TAM_TAB; i++){
      this.tabuleiro[i] = [this.VAZIO , this.VAZIO , this.VAZIO];
    }
  }

  //retorna se a tela de inicio deve ser exibida.

  get _showInicio(): boolean {
    return this._showInicio;

  //retorna se a tela de inicio de jogo deve ser exibida.
  }

  get _showTabuleiro(): boolean {
    return this._showTabuleiro;
  }

 //retorna se a tela de fim de jogo deve ser exibida.
  get _showFinal(): boolean {
    return this._showFinal;
  }
//retoorna o numero do jogador a jogar.

  get jogador(): number {
    return this._jogador;
  }

  //exibe o tabuleiro.

  iniciarJogo(): void {
    this._showInicio = false;
    this._showTabuleiro = true;

  }


}

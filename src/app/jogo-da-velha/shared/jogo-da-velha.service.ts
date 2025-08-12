import { Injectable } from '@angular/core';

@Injectable()
export class JogoDaVelhaService {

  private readonly TAM_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
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

  get showInicio(): boolean {
    return this._showInicio;
  }

  //retorna se a tela de inicio de jogo deve ser exibida.

  get showTabuleiro(): boolean {
    return this._showTabuleiro;
  }

 //retorna se a tela de fim de jogo deve ser exibida.
  get showFinal(): boolean {
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

  jogar(posX: number , posY: number): void {
    //jogada invalida
    if (this.tabuleiro[posX][posY] !== this.VAZIO || this.vitoria ) {
      return ;
    }

    this.tabuleiro[posX][posY] = this._jogador;
    this.numMovimentos++;

    // sempre analisa se o fim do jogo chegou
    this.vitoria = this.fimJogo(posX , posY , this.tabuleiro , this._jogador);

    // troca o jogador
    this._jogador = (this._jogador === this.x) ? this.O : this.X; 

    // se o jogo nao acabou o cpu joga
    if (!this.vitoria && this.numMovimentos < 9){
      this.cpuJogar();
    }

    //house vitoria
    if (this.vitoria !== false){
      this._showFinal = true ;
    }

    //empate
    if (!this.vitoria && this.numMovimentos ===9){
      this._jogador = 0 ;
      this._showFinal = true;
    }

  }

  fimJogo (linha: number , coluna: number , tabuleiro:any , jogador: number) {
    let fim : any = false;

    //valida a linha
    if (tabuleiro[linha][0] === jogador && 
      tabuleiro[linha][1] === jogador &&
      tabuleiro[linha][2] === jogador) {
      fim = [[linha, 0], [linha, 1] ,[linha,2]];
    }


    //valida a colunas
    if (tabuleiro[0][coluna] === jogador && 
      tabuleiro[1][coluna] === jogador &&
      tabuleiro[2][coluna] === jogador) {
      fim = [[0, coluna], [1, coluna] ,[2,coluna]];
    }

    //valida as diagonais
    if (tabuleiro[0][0] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro [2][2] === jogador){
      fim = [[0,0],[1,1],[2,2]];
    }

    if (tabuleiro[0][2] === jogador &&
      tabuleiro [1][1] === jogador &&
      tabuleiro [2][0] === jogador){
      fim = [[0,2],[0,1],[2,0]];
    }

    return fim;

  }

  cpuJogar(): void {
    //verifica jogada de vitoria

    let jogada: number[] = this.obterJogada(this.O);

    if(jogada.length <= 0) {
      //tentar jogar para evitar derrota
      jogada = this.obterJogada(this.X);
    }

    if (jogada.length <=0) {
      //joga aleatorio
      let jogadas : any = [];
      for (let i=0; i<this.TAM_TAB; i++){
        for (let j=0; j<this.TAM_TAB; j++){
          if (this.tabuleiro[i][j] === this.VAZIO){
            jogadas.push([i,j]);
          }
        }
      }
      let k = Math.floor((Math.random()* (jogadas.length -1)));
      jogada = [jogadas[k][0], jogadas[k][1]];
    }

    //faz a jogada
    this.tabuleiro[jogada[0]] [jogada[1]] = this._jogador;
    this.numMovimentos++;
    //verifica se chegou ao fim do jogo
    this.vitoria = this.fimJogo (jogada[0] , jogada[1] , this.tabuleiro , this._jogador);
    //inverte4 jogador
    this._jogador = (this._jogador === this.X) ? this.O : this.X ;
  
  }


    obterJogada(jogador: number): number[] {
      let tab = this.tabuleiro;
      for (let lin = 0 ; lin < this.TAM_TAB; lin++) {
        for(let col = 0 ; col < this.TAM_TAB; col++){
          if (tab[lin][col] !== this.VAZIO){
            continue;
          }
          tab[lin][col] = jogador;
          if (this.fimJogo(lin , col , tab , jogador)){
            return [lin,col];
          }
          tab[lin][col] = this.VAZIO;
        }
      }
      return [];
    }

    //retorna se a peca X deve ser exibida para a coordenada informada.
    exibirX(posX: number, posY : number):boolean {
      return this.tabuleiro[posX][posY] === this.X;
    }

     //retorna se a peca y deve ser exibida para a coordenada informada.

    exibirY(posX: number, posY : number):boolean {
      return this.tabuleiro[posX][posY] === this.O;
    }

    // retorna se a marcacao de vitoria deve ser exibida para a coordenada informada

    exibirVitoria(posX: number , posY: number ):boolean {
      let exibirVitoria: boolean =false ;

      if (!this.vitoria){
        return exibirVitoria;
      }

      for (let pos of this.vitoria){
        if (pos[0] === posX && pos[1] === posY ){
          exibirVitoria = true;
          break;
        }
      } 
      return exibirVitoria;

    }
    
    novoJogo(): void {
      this.inicializar();
      this._showFinal = false;
      this._showInicio = false;
      this.showTabuleiro = true;
    }


}

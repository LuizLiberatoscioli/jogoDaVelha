import { JogoDaVelhaPage } from './app.po';

describe('jogo-da-velha App', () => {
  let page: JogoDaVelhaPage;

  beforeEach(() => {
    page = new JogoDaVelhaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

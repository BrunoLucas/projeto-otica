import { OticaVictoriaPage } from './app.po';

describe('otica-victoria App', function() {
  let page: OticaVictoriaPage;

  beforeEach(() => {
    page = new OticaVictoriaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

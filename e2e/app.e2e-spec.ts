import { TripMakerTemplatePage } from './app.po';

describe('TripMaker App', function() {
  let page: TripMakerTemplatePage;

  beforeEach(() => {
    page = new TripMakerTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

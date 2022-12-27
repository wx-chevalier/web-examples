import { App } from '../../src/app';
import { JwtService } from '../../src/services/jwt.service';


describe('the App module', () => {
  it('is defined', () => {
    expect(new App(new JwtService())).toBeDefined();
  })
});

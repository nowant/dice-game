import { ToFixedPipe } from './to-fixed.pipe';

describe('ToFixedPipe', () => {
  it('Create an instance', () => {
    const pipe = new ToFixedPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return 0.1 + 0.2 = 0.3', () => {
    const pipe = new ToFixedPipe().transform(0.1 + 0.2, 1);
    expect(pipe).toBe(0.3);
  });

  it('Should return 5.001 * 2.333 = 11.7', () => {
    const pipe = new ToFixedPipe().transform(5.001 * 2.333, 1);
    expect(pipe).toBe(11.7);
  });

  it('Should round 23.77771 to 23.78', () => {
    const pipe = new ToFixedPipe().transform(23.77771, 2);
    expect(pipe).toBe(23.78);
  });
});

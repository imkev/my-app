import { DiscountFormatterPipe } from './discount-formatter.pipe';

describe('DiscountFormatterPipe', () => {
  it('creates an instance', () => {
    const pipe = new DiscountFormatterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should not transform null value', function () {
    const pipe = new DiscountFormatterPipe();
    expect(pipe.transform(null, 10)).toEqual(null);
  });

  it('should transform price with discount', function () {
    const pipe = new DiscountFormatterPipe();
    expect(pipe.transform(100, 10)).toEqual('You save <del>100</del> <b>90</b>');
  });
});

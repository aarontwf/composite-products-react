import QuantityValidator from "./QuantityValidator";

const ERROR_MESSAGE = 'Quantity must be greater than zero';

test('Negative quantity returns validation error', () => {
  const result = QuantityValidator.validate(-1);
  expect(result).toEqual(ERROR_MESSAGE);
});

test('Zero quantity returns validation error', () => {
  const result = QuantityValidator.validate(0);
  expect(result).toEqual(ERROR_MESSAGE);
});

test('Undefined quantity returns validation error', () => {
  const result = QuantityValidator.validate(undefined);
  expect(result).toEqual(ERROR_MESSAGE);
});

test('Possive quantity returns no validation error', () => {
  const result = QuantityValidator.validate(1);
  expect(result).toBeNull();
});

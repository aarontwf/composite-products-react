import CompositeProductNameValidator from "./CompositeProductNameValidator";

const ERROR_MESSAGE = 'Please specify a name';

test('Undefined quantity returns validation error', () => {
  const result = CompositeProductNameValidator.validate(undefined);
  expect(result).toEqual(ERROR_MESSAGE);
});

test('Empty name returns validation error', () => {
  const result = CompositeProductNameValidator.validate('');
  expect(result).toEqual(ERROR_MESSAGE);
});

test('Non-empty name returns no validation error', () => {
  const result = CompositeProductNameValidator.validate('Hello');
  expect(result).toBeNull();
});

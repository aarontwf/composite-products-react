class QuantityValidator {
  private constructor() { };

  public static validate(quantity?: number): string | null {
    if (quantity && quantity > 0) {
      return null;
    } else {
      return 'Quantity must be greater than zero';
    }
  }
}

export default QuantityValidator;

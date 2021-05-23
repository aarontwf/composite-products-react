class CompositeProductNameValidator {
  private constructor() { };

  public static validate(name?: string): string | null {
    return name ? null : 'Please specify a name';
  }
}

export default CompositeProductNameValidator;

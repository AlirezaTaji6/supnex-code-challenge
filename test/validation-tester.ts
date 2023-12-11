export class ValidationTester {
  constructor(public errors: Record<string, string>) {}

  isFirstLayer(fields: string[]) {
    const properties = Object.keys(this.errors);
    expect(fields.length).toBe(properties.length);

    for (const field of fields) {
      const error = properties.find((e) => {
        return e == field;
      });

      expect(error).toBeDefined();
    }
  }
}

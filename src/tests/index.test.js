import expect from "expect";
import deepFreeze from "deep-freeze";
describe("index test", () => {
  it("basic test", () => {
    const input = "test";
    deepFreeze(input);
    const after = "test1";
    deepFreeze(after);
    const result = `${input}1`;
    expect(after).toEqual(result);
  });
});

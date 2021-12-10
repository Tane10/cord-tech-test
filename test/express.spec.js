import { checkAgainstRules } from "../lib/middleware/express";

describe("middleware tests", () => {
    it("should read a json file", () => {
        const rules = checkAgainstRules();
        expect(true).toBeFalsy();
    });
});
import {testUrl} from '../../src/utils/constants';

describe("page loaded", () => {
    it("need to go to localhost:3000", () => {
        cy.visit(testUrl);
        cy.contains('МБОУ АЛГОСОШ')
    });
});
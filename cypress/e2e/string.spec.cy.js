import {testUrl, circleTest, dataTestModified, dataTestDefault, dataTestChanging} from '../../src/utils/constants';

describe("page string correct view", () => {
    beforeEach(() => {
        cy.visit(`${testUrl}/recursion`)
        cy.get("input").as("input")
        cy.get("input").should('have.value', '');
        cy.get("button").as("button")
    })
    it("button disable when is opening page", () => {
        cy.get("@button").should("be.disabled")
    })
    it("string reversal correct", () => {
        cy.get("input").type('12345');
        cy.get("button").eq(1).click();

        cy.get(circleTest)
            .should('have.length', 5)
            .each((el, index) => {
                cy.wrap(el => expect(el).contains(index + 1));
                if (index === 0 || index === 4) {
                    cy.wrap(el).get(dataTestChanging);
                }
                if (index === 1) {
                    cy.wrap(el).get(dataTestDefault);
                }
            });

        cy.get(circleTest)
            .should('have.length', 5)
            .each((el, index) => {
                cy.wrap(el).contains(5 - index);
                cy.wrap(el).get(dataTestModified);
            });
    });
})


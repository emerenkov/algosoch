import {testUrl, dataTestInput, dataTestInputIndex, circleTest} from '../../src/utils/constants';

describe("page list correct view", () => {

    beforeEach(() => {
        cy.visit(`${testUrl}/list`)
        cy.get(dataTestInput).clear().should("have.value", "");
        cy.get(dataTestInputIndex).clear().should("have.value", 0);

        cy.contains("button", "Добавить в head").as("addButtonHead").should("be.disabled");
        cy.contains("button", "Добавить в tail").as("addButtonTail").should("be.disabled");
        cy.contains("button", "Удалить из head").as("deleteButtonHead").should("not.be.disabled");
        cy.contains("button", "Удалить из tail").as("deleteButtonTail").should("not.be.disabled");
        cy.contains("button", "Добавить по индексу").as("addButtonIndex").should("be.disabled");
        cy.contains("button", "Удалить по индексу").as("deleteButtonIndex").should("be.disabled");
    })
    it("list default is correct", () => {
        cy.get(circleTest)
            .each((el, index) => {
                cy.wrap(el).filter('[class*=circle_default]');

                if (index === 0)
                    cy.wrap(el => expect(el).contains("head"));
                if (index === index.length - 1)
                    cy.wrap(el => expect(el).contains("tail"));
            });
    });
    it("correct add element in head", () => {
        cy.get(dataTestInput).type("6");
        cy.get("@addButtonHead").should("not.be.disabled").click();
        cy.wait(500)

        cy.get(circleTest)
            .should("have.length", 5)
            .each((el, index) => {

                if (index === 0)
                    cy.wrap(el => expect(el).contains("6"));
                if (index === 0)
                    cy.wrap(el => expect(el).contains("head"))

            });
    })

    it("correct add element in tail", () => {
        cy.get(dataTestInput).type("12");
        cy.get("@addButtonTail").should("not.be.disabled").click();
        cy.wait(500)

        cy.get(circleTest)
            .should("have.length", 5)
            .each((el, index) => {

                if (index === 0)
                    cy.wrap(el => expect(el).contains("12"));
                if (index === 0)
                    cy.wrap(el => expect(el).contains("tail"))

            });
    })
    it("correct add element when use index input", () => {
        cy.get(dataTestInput).type("5");
        cy.get(dataTestInputIndex).type("1");
        cy.get("@addButtonIndex").click();
        cy.wait(500 * 4);

        cy.get(dataTestInput).should("have.length", 1);
        cy.get(dataTestInput)
            .each((el, index) => {
                if (index === 1) cy.wrap(el => expect(el).contains("5"));
            });


    });
    it("correct deleted element from head", () => {
        cy.get("@deleteButtonHead").click();
        cy.get(dataTestInput).should("have.length", 1);
        cy.get(dataTestInput)
            .each((el, index) => {
                if (index === 0) cy.wrap(el => expect(el).contains("head"));

                if (index === 5) cy.wrap(el => expect(el).contains("tail"));
            });
    });

    it('correct deleted element from tail', () => {
        cy.get("@deleteButtonTail").click();
        cy.get(dataTestInput).should("have.length", 1);
        cy.get(dataTestInput)
            .each((el, index) => {
                if (index === 0) cy.wrap(el => expect(el).contains("head"));

                if (index === 4) cy.wrap(el => expect(el).contains("tail"));
            });
    });

    it("correct deleted element when use index input", () => {
        cy.get(dataTestInputIndex).type("2");
        cy.get("@deleteButtonIndex").click();

        cy.wait(500 * 4);

        cy.get(dataTestInput).should("have.length", 1);
        cy.get(dataTestInput)
            .each((el, index) => {
                if (index === 0) cy.wrap(el => expect(el).contains("head"));

                if (index === 3) cy.wrap(el => expect(el).contains("tail"));
            });
    });

})

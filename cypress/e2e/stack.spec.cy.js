import {testUrl, circleTest, dataTestContentCircle, dataTestChanging, dataTestDefault} from '../../src/utils/constants';

describe("page stack correct view", () => {
    const testingArray = [1, 2, 3, 4]

    beforeEach(() => {
        cy.visit(`${testUrl}/stack`)
        cy.get("input").should('have.value', '');
        cy.contains("button", "Добавить").as("addButton")
        cy.contains("button", "Удалить").as("deleteButton")
        cy.contains("button", "Очистить").as("clearButton")
    })
    it("button disable when is opening page", () => {
        cy.get("input").should("be.empty")
        cy.get("@addButton").should("be.disabled")
        cy.get("@deleteButton").should("be.disabled")
        cy.get("@clearButton").should("be.disabled")
    })
    it("correct add element in stack", () => {
        for (let i = 0; i < testingArray.length; i++) {
            cy.clock()
            cy.get("input").should("be.empty").type(testingArray[i])
            cy.get("@addButton").should("not.be.disabled").click()
            cy.get(circleTest)
            cy.tick(500)

            cy.get(circleTest)
                .eq(i)
                .should("have.text", testingArray[i])
            cy.get(dataTestContentCircle).eq(i).find(dataTestChanging)
                .parent()
                .should("contain", "top")
            cy.tick(500)
            cy.get(dataTestContentCircle).eq(0).find(dataTestDefault);
        }
    })
    it("correct deleted element from stack", () => {
        cy.clock()
        for (let i = 0; i < testingArray.length; i++) {
            cy.get("input").should("be.empty").type(testingArray[i])
            cy.get("@addButton").should("not.be.disabled").click()
            cy.tick(1000)
        }
        cy.get(circleTest).as("circles")
        for (let j = 0; j <= testingArray.length -1; j++) {
            cy.get("@deleteButton").click()
            cy.tick(500)
            cy.get("body").then(($body) => {
                if ($body.text().includes(circleTest)) {
                    cy.get(circleTest)
                        .eq(testingArray.length - 1 - j)
                    cy.get(dataTestContentCircle).eq(1).find(dataTestChanging);
                }
            })
        }
    })
    it("correct clear stack", () => {
        cy.clock()
        for (let i = 0; i < testingArray.length; i++) {
            cy.get("input").should("be.empty").type(testingArray[i])
            cy.get("@addButton").should("not.be.disabled").click()
            cy.tick(1000)
        }
        cy.get("@clearButton").should("not.be.disabled").click()
        cy.tick(500)

        cy.get(circleTest).should("have.length", 0)
    })
})

import {testUrl} from '../../src/utils/constants';

describe('routing app', function() {
    it('go to МБОУ АЛГОСОШ', function() {
        cy.visit(testUrl);
    });

    it('go to page string', () => {
        cy.visit(`${testUrl}/recursion`);
    });

    it('go to page fibonacci', () => {
        cy.visit(`${testUrl}/fibonacci`);
    });

    it('go to page  sorting', () => {
        cy.visit(`${testUrl}/sorting`);
    });

    it('go to page stack', () => {
        cy.visit(`${testUrl}/stack`);
    });

    it('go to page queue', () => {
        cy.visit(`${testUrl}/queue`);
    });

    it('go to page list', () => {
        cy.visit(`${testUrl}/list`);
    });
});

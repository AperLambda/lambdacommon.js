/*
 * Copyright © 2020 LambdAurora <aurora42lambda@gmail.com>
 *
 * This file is part of lambdacommon.js.
 *
 * Licensed under the MIT license. For more information,
 * see the LICENSE file.
 */

import Identifier from './Identifier.mjs';
import termkit from 'terminal-kit';
const term = termkit.terminal;

/**
 * Tests an expression and returns a value to compare.
 * @callback TestCallback
 */

/**
 * Represents a test.
 */
export class Test
{
    /**
     * Returns a new test.
     * @param {String} name The name of the test.
     * @param {TestCallback} callback The callback which is the test expression and returns a value to compare.
     * @param expected The expected return value of the callback.
     */
    constructor(name, callback, expected) {
        this.name = name;
        this.callback = callback;
        this.expected = expected;
    }

    /**
     * Executes the test.
     * @return {boolean} True if the test passed, else false.
     */
    test() {
        term("Testing ").blue(`"${this.name}"`)("...\n");
        term(" -> Result: ");
        let value = this.callback();
        let result = value === this.expected;
        if (result) {
            term.bold.brightGreen("PASSED\n");
        } else {
            term.bold.brightRed("FAILED")(" ; expected: ").brightMagenta(JSON.stringify(this.expected))(", got: ").brightMagenta(JSON.stringify(value))(".\n");
        }
        return result;
    }

    toString() {
        return "Test " + this.name + ", expected: " + JSON.stringify(this.expected);
    }
}

/**
 * Represents a test section which stores multiple tests.
 */
export class TestSection
{
    constructor(id) {
        this.id = new Identifier(id);
        this.tests = [];
    }

    /**
     * Adds a new test to this section.
     * @param name The name of the test.
     * @param callback The function to test.
     * @param expected The expected value of the test.
     */
    add(name, callback, expected) {
        this.tests.push(new Test(name, callback, expected))
    }

    /**
     * Executes this section's tests.
     * @return {boolean} True if all the tests passed, else false.
     */
    test() {
        term.brightYellow(`========== ${this.id} ==========\n`);
        let passed = this.tests.filter(test => test.test()).length;
        let result = passed == this.tests.length;
        let message = `(${passed} tests passed out of ${this.tests.length})`;
        term("=> ")
        if (result)
            term.brightGreen(`PASSED ${message}\n`);
        else
            term.brightRed(`FAILED ${message}\n`);
        return result;
    }
}

/**
 * Lets you add tests to the given section.
 * @callback SectionCallback
 * @param {TestSection} section The section.
 */

/**
 * Represents a test unit.
 */
export class TestUnit
{
    constructor() {
        this.sections = []
    }

    /**
     * Adds a new section to this test unit.
     * @param {(Identifier|String)} id The identifier of the section.
     * @param {SectionCallback} callback The callback to add tests to the section.
     * @return {TestUnit} This.
     */
    section(id, callback = _ => {}) {
        let section = new TestSection(id);
        callback(section);
        this.sections.push(section);
        return this;
    }

    /**
     * Executes all the tests of this unit.
     * @return {boolean} True if all the tests passed, else false.
     */
    test() {
        let sections_count = this.sections.length;
        term(`Testing ${sections_count} sections...\n`)
        let passed = this.sections.filter(section => section.test()).length;
        let result = passed == sections_count;
        let color = result ? str => term.green(str) : str => term.red(str);
        term("\n\nTESTS RESULTS:\n")
        color(`  PASSSED: ${passed}/${sections_count}\n`)
        color(`  FAILED: ${sections_count - passed}/${sections_count}\n`);
        return result;
    }
}

export default {
    Test: Test,
    TestSection: TestSection,
    TestUnit: TestUnit
};

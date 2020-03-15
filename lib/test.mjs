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
 * Represents a test.
 */
export class Test
{
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
 * Represents a test unit.
 */
export class TestUnit
{
    constructor() {
        this.sections = []
    }

    /**
     * Adds a new section to this test unit.
     * @param id {(Identifier|String)} The identifier of the section.
     * @return This.
     * @see section(id,callback)
     */
    section(id) {
        return this.section(id, _ => {})
    }

    /**
     * Adds a new section to this test unit.
     * @param id {(Identifier|String)} The identifier of the section.
     * @param callback The callback to add the tests to the section.
     * @return This.
     */
    section(id, callback) {
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

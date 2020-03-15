/*
 * Copyright © 2020 LambdAurora <aurora42lambda@gmail.com>
 *
 * This file is part of lambdacommon.js.
 *
 * Licensed under the MIT license. For more information,
 * see the LICENSE file.
 */

/**
 * Represents an identifier.
 * 
 * It's made of two parts: the namespace and the path.
 * It's syntax is the following: `namespace:path`.
 * This type can quickly be shited into its string form.
 */
export default class Identifier
{
    constructor(raw, path = "") {
        if (path != undefined && path.length > 0) {
            if (raw instanceof Identifier) {
                return new Identifier(raw.to_string() + '/' + path);
            } else if (raw == undefined || raw.length == 0) {
                throw new Error("lambdacommon.js ; Identifier::new(namespace, path): namespace cannot be undefined or empty.");
            } else if (raw.includes(':')) {
                return new Identifier(raw + '/' + path);
            }
            this.namespace = raw;
            this.path = path;
            return this;
        }
        if (raw instanceof Identifier)
           return new Identifier(raw.to_string());
        let split = raw.split(':');
        if (split.length != 2 || !split[0].length || !split[1].length)
           throw new Error("lambdacommon.js ; Identifier::new(raw): parse error, Identifier should be of the form 'namespace:path'.");
        return new Identifier(split[0], split[1]);
    }

    sub(path) {
        return new Identifier(this, path);
    }

    /**
     * Indicates whether some other object is "equal to" this one.
     * @param {(String|Identifier)} other The other object to compare.
     * @return {boolean} True if this identifier is "equal to" another, else false.
     */
    equals(other) {
        if (this === other) {
            return true;
        } else if (typeof other == "string") {
            let split = other.split(':');
            if (split.length != 2) return false;
                return this.namespace === split[0] && this.path == split[1];
        } else if (other instanceof Identifier) {
            return this.namespace == other.namespace && this.path == other.path;
        }
        return false;
    }

    /**
     * Converts the Identifier to a String; it is also used by `Symbol.toPrimitive`.
     * @return {String} The parsed Identifier, in the `namespace:path` form.
     */
    to_string() {
        return this.namespace + ':' + this.path;
    }

    [Symbol.toPrimitive](hint) {
        return this.to_string();
    }

    toJSON() {
        return this.to_string();
    }
}

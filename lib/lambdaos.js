/*
 * Copyright © 2017 AperLambda <aper.entertainment@gmail.com>
 *
 * This file is part of lambdacommon.js.
 *
 * Licensed under the MIT license. For more information,
 * see the LICENSE file.
 */

// Require native os
const n_os = require('os');
// Require enum
const Enum = require('enum');

const OS = new Enum(['WINDOWS', 'DARWIN', 'LINUX', 'FREEBSD', 'OPENBSD', 'SUNOS', 'UNKNOWN']);
exports.OS = OS;

const OSArch = new Enum(['ARM', 'ARM64', 'X86', 'X64', 'UNKNOWN']);
exports.OSARch = OSArch;

/**
 * Gets the running OS.
 * @returns The OS as an enum value.
 */
exports.getOs = function ()
{
    switch (n_os.platform())
    {
        case 'darwin':
            return OS.DARWIN;
        case 'freebsd':
            return OS.FREEBSD;
        case 'openbsd':
            return OS.OPENBSD;
        case 'linux':
            return OS.LINUX;
        case 'sunos':
            return OS.SUNOS;
        case 'win32':
            return OS.WINDOWS;
        default:
            return OS.UNKNOWN;
    }
};

/**
 * Gets the architecture used.
 * @returns The architecture as an enum value.
 */
exports.getArch = function ()
{
    switch (n_os.arch())
    {
        case 'arm':
            return OSArch.ARM;
        case 'arm64':
            return OSArch.ARM64;
        case 'x86':
            return OSArch.X86;
        case 'x64':
            return OSArch.X64;
        default:
            return OSArch.UNKNOWN;
    }
};
/*
 * Copyright © 2017 AperLambda <aper.entertainment@gmail.com>
 *
 * This file is part of lambdacommon.js.
 *
 * Licensed under the MIT license. For more information,
 * see the LICENSE file.
 */

// Require native filesystem
//const fs = require('fs');
// Require enum
const Enum = require('enum');
// Require lambdacommon's OS
//const os = require('lambdaos');
const path = require('path');

const PathType = new Enum(['WINDOWS', 'COMMON']);
exports.PathType = PathType;

exports.getDefaultPathSeparator = function ()
{
  return path.sep;
};

/*class Path
{
    constructor(path)
    {
        set(path);
    }

    set (string, pathtype)
    {
        if (!pathtype)
        {
            if (os.getOs() === os.OS.WINDOWS)
                pathtype = PathType.WINDOWS;
            else
                pathtype = PathType.COMMON;
        }
        this._pathtype = pathtype;


    }
}*/

/**
 * Gets the current working directory as a string.
 */
exports.getCurrentWorkingDirectoryStr = function ()
{
  return process.cwd() + this.getDefaultPathSeparator();
};

/*module.exports = {
    Path: Path
};*/
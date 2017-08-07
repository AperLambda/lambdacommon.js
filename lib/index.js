/*
 * Copyright © 2017 AperLambda <aper.entertainment@gmail.com>
 *
 * This file is part of lambdacommon.js.
 *
 * Licensed under the MIT license. For more information,
 * see the LICENSE file.
 */
module.exports =
    {
        version: require('../package.json').version,
        filesystem: require('./filesystem'),
        os: require('./lambdaos')
    };
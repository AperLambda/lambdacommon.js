/*
 * Copyright © 2017 AperLambda <aper.entertainment@gmail.com>
 *
 * This file is part of lambdacommon.js.
 *
 * Licensed under the MIT license. For more information,
 * see the LICENSE file.
 */

/**
 * Gets the system memory usage for the application.
 *
 * @returns {String}
 */
exports.getSystemMemoryUsage = function ()
{
  let memoryInBytes = process.memoryUsage().heapTotal - process.memoryUsage().heapUsed;
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  let k = 1000;
  let i = Math.floor(Math.log(memoryInBytes) / Math.log(k));

  return parseFloat((memoryInBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
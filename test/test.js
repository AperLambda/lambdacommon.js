try
{
  const lambdacommon = require('../lib/index');
  console.log('Testing λcommon.js v' + lambdacommon.version + '...');
  console.log('');
  console.log('====== filesystem ======');
  console.log('Current path separator: ' + lambdacommon.filesystem.getDefaultPathSeparator());
  console.log('Current working directory: ' + lambdacommon.filesystem.getCurrentWorkingDirectoryStr());
  console.log('');
  console.log('====== OS ======');
  console.log('Current OS: ' + lambdacommon.os.getOs().toString());
  console.log('Current Arch: ' + lambdacommon.os.getArch().toString());
  console.log('');
  console.log('====== Process ======');
  console.log('Memory usage: ' + lambdacommon.process.getSystemMemoryUsage());
  console.log('');
  console.log('Test finished!');
}
catch (err)
{
  console.log("Test failed! Error: " + err);
  process.exit(1);
}
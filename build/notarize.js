const { notarize } = require('electron-notarize');
try {
  require('dotenv').config();
} catch (error) {
  console.log(error)
}

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;  
  if (electronPlatformName !== 'darwin' || process.env.CSC_IDENTITY_AUTO_DISCOVERY === "false") {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;
  const appId = require('../package.json').build.appId;

  console.log(`Notarizing ${appId}...`)

  return await notarize({
    appBundleId: appId,
    appPath: appPath,
    appleId: process.env.AC_USERNAME,
    appleIdPassword: process.env.AC_PASSWORD,
  });
};
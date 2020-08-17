import * as path from 'path'

const isDevelopment = process.env.APP_ENV === 'development';

const useResourcePath = (relativePath: string): string => {
  if(isDevelopment){
    return path.join(path.resolve(), `resources`, relativePath);
  } else {
    return path.join(process.resourcesPath, relativePath);
  }
};

export default useResourcePath;

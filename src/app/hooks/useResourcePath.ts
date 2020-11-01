import * as path from "path";

const useResourcePath = (relativePath: string): string => {
  if (process.env.APP_ENV === "development") {
    return path.join(path.resolve(), `resources`, relativePath);
  }
  return path.join(process.resourcesPath, relativePath);
};

export default useResourcePath;

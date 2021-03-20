export const getFileExtension = (filename: string): string | undefined => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop() || undefined : undefined;
};

/**
 * Reads file as text via a FileReader.
 *
 * @param file A file (e.g. from a file input or drop operation).
 * @returns The a promise of text from that file.
 */
export const readFileAsText = async (file: File): Promise<string> => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (e: ProgressEvent<FileReader>) => {
      resolve(e.target!.result as string);
    };
    reader.onerror = (e: ProgressEvent<FileReader>) => {
      const error = e.target?.error || new Error("Error reading file as text");
      reject(error);
    };
    reader.readAsText(file);
  });
};

/**
 * Reads file as text via a FileReader.
 *
 * @param file A file (e.g. from a file input or drop operation).
 * @returns The a promise of text from that file.
 */
export const readFileAsUint8Array = async (file: File): Promise<Uint8Array> => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (e: ProgressEvent<FileReader>) => {
      resolve(new Uint8Array(e.target!.result as ArrayBuffer));
    };
    reader.onerror = (e: ProgressEvent<FileReader>) => {
      const error = e.target?.error || new Error("Error reading file");
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};

/**
 * @param str A string assumed to be ASCII.
 * @returns Corresponding bytes.
 */
export const asciiToBytes = (str: string): ArrayBuffer => {
  var bytes = new Uint8Array(str.length);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes.buffer;
};

/**
 * Detect a module using the magic comment.
 */
export const isPythonMicrobitModule = (code: string) => {
  const codeLines = code.split(/\r?\n/);
  const firstThreeLines = codeLines.slice(0, 3);
  return Boolean(
    firstThreeLines.find((line) => line.indexOf("# microbit-module:") === 0)
  );
};

export const generateId = () =>
  Math.random().toString(36).substring(2) +
  Math.random().toString(36).substring(2);
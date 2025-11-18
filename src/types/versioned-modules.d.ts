// Declare modules that include package versions in import strings (e.g. "lucide-react@0.487.0")
// These imports exist in the codebase but refer to the same packages without the version suffix.
// This file maps those versioned module names to `any` to avoid type errors during project typechecking.

declare module '*@*' {
  const whatever: any;
  export = whatever;
  export default whatever;
}

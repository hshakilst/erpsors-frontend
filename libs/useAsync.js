import { useState, useCallback, useEffect } from "react";

const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    (args = null) => {
      setStatus("pending");
      setValue(null);
      setError(null);
      setLoading(true);
      return asyncFunction(args)
        .then((response) => {
          setValue(response);
          setStatus("finished");
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
          setLoading(false);
        });
    },
    [asyncFunction]
  );
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(
    (args = null) => {
      if (immediate) {
        execute(args);
      }
    },
    [execute, immediate]
  );
  return { execute, status, loading, value, error };
};

export default useAsync;

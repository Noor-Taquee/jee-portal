import { useEffect, useState } from "react";

/** Changes the URL hash. ` "#" ` is automatically prepended if not present. */
export function changeHash(newHash: string) {
  window.location.hash = newHash.startsWith("#") ? newHash : "#" + newHash;
}

export type NormalizedHash = [location: string[], attributes: string[]];

/**
 * Takes the ` rawHash ` string and returns the location and attributes present in the string.
 *
 * @param {string} rawHash format for the string
 *
 * _location_ - `{.}[]/{.}[]`
 *
 * _attributes_ - `{.}[]&{.}[]`
 *
 * **format**:
 * `#{location}[]?{attributes}[]`
 *  @example - "question"
 */
function normalize(rawHash: string): NormalizedHash {
  const location: string[] = [];
  const attributes: string[] = [];

  rawHash = rawHash.startsWith("#") ? rawHash.slice(1) : rawHash;

  const hashParts = rawHash.split("?");

  const locationS = hashParts[0];
  if (locationS) location.push(...locationS.split("/"));

  const attributesS = hashParts[1];
  if (attributesS) attributes.push(...attributesS.split("&"));

  return [location, attributes];
}

const routes = ["login", "question", "result"];
const defaultRoute = "login";

/** Hook to bind app state with the url hash.  */
export function useHash() {
  const [panel, setPanel] = useState<string>(defaultRoute);

  useEffect(() => {
    function handleHashChange() {
      const rawHash = window.location.hash;
      const [location, _attributes] = normalize(rawHash);

      const currentLocation = location[0];

      if (currentLocation && routes.includes(currentLocation)) {
        setPanel(currentLocation);
      } else {
        changeHash(defaultRoute);
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("load", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("load", handleHashChange);
    };
  }, []);

  return panel;
}

import { useSearchParams } from "react-router-dom";

function useUrlPotion() {
  const [searchParms] = useSearchParams();
  const lat = searchParms.get("lat");
  const lng = searchParms.get("lng");

  return [lat, lng];
}

export default useUrlPotion;

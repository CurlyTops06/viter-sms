import { useQuery } from "@tanstack/react-query";
import { queryData } from "./queryData";

const useQueryData = (
  endpoint,
  method,
  key = "",
  fd = {},
  id = null,
  refetchOnWindowFOcus = false,
  queryProperty = {},
) => {
  return useQuery({
    queryKey: [key, id],
    queryFn: async () => queryData(endpoint, method, fd),
    retry: false,
    refetchOnWindowFocus: refetchOnWindowFOcus,
    cacheTime: 200,
    ...queryProperty,
  });
};

export default useQueryData;

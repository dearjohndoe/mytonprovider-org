import axios, { AxiosError } from "axios"
import type { Provider, ApiResponse } from "@/types/provider"

export async function fetchProviders(
  offset = 0,
  limit = 10,
  sortField: string | null = null,
  sortDirection: "asc" | "desc" = "asc"
): Promise<ApiResponse> {
    var loading = false;
    var providers :Provider[] = [];
    var errorMsg : string | null = null;

    const request = async () => {
        if (loading || providers.length > 0) {
            return
        }

        loading = true
        await axios.post("https://mytonprovider.org/api/v1/providers/search", {
          filter: {},
          sort: sortField
            ? { column: sortField, order: sortDirection }
            : undefined,
          exact: [],
          limit,
          offset,
        })
        .then((response) => {
            loading = false
            providers = response.data as Provider[];
            console.log("Fetched providers:", providers);
        })
        .catch((error :AxiosError) => {
            loading = false
            errorMsg = error.message;
            console.error("Error loading products:", errorMsg)
        })
    };

    await request();

    return {
      errorMsg: errorMsg,
      data: providers
    } as ApiResponse;
}

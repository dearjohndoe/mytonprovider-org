import type { Provider } from "@/types/provider"

const mockProviders: Provider[] = [
  {
    id: "1",
    publicKey: "k2ocdj5tKDes11wk2ocdj5tKDe2dEew92k2ocdj5tKDe-e120dj5tKDe2dEFW05",
    price: 0.0501,
    maxSpan: 3600,
    available: false,
    location: "Switzerland, Zurich",
    resourceScore: 0.92,
    totalStorage: 1024,
    uptime: 99.9,
    workingTime: 30,
    providerRating: 4.2,
  },
  {
    id: "2",
    publicKey: "a9b8c7d6e5f4g3h2i1j0k9l8m7n6o5p4q3r2s1t0u9v8w7x6y5z4a3b2c1d0e9f8",
    price: 0.0434,
    maxSpan: 3600 * 4,
    available: true,
    location: "England, London",
    resourceScore: 0.88,
    totalStorage: 2048,
    uptime: 99.8,
    workingTime: 230,
    providerRating: 4.8,
  },
  {
    id: "3",
    publicKey: "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4z3y2x1w0v9u8",
    price: 0.0501,
    maxSpan: 3600 * 6,
    available: true,
    location: "Kazakhstan, Almaty",
    resourceScore: 0.82,
    totalStorage: 512,
    uptime: 99.7,
    workingTime: 130,
    providerRating: 3.9,
  },
  {
    id: "4",
    publicKey: "f8e7d6c5b4a3z2y1x0w9v8u7t6s5r4q3p2o1n0m9l8k7j6i5h4g3f2e1d0c9b8a7",
    price: 0.055,
    maxSpan: 3600 * 24,
    available: true,
    location: "Russia, Kazan",
    resourceScore: 0.79,
    totalStorage: 256,
    uptime: 98.9,
    workingTime: 3,
    providerRating: 3.5,
  },
  {
    id: "5",
    publicKey: "p0o9i8u7y6t5r4e3w2q1a0s9d8f7g6h5j4k3l2z1x0c9v8b7n6m5q4w3e2r1t0y9",
    price: 0.0601,
    maxSpan: 3600 * 24,
    available: true,
    location: "USA, New York",
    resourceScore: 0.85,
    totalStorage: 128,
    uptime: 70.1,
    workingTime: 3000,
    providerRating: 4.1,
  },
]

export async function fetchProviders(
  offset = 0,
  limit = 10,
  sortField: string | null = null,
  sortDirection: "asc" | "desc" = "asc",
): Promise<Provider[]> {
  await new Promise((resolve) => setTimeout(resolve, 400)) 

  return [...mockProviders]
}

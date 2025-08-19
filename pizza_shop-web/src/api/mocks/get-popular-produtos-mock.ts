import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsMock = http.get<
  never, 
  never, 
  GetPopularProductsResponse>
  ('/metrics/popular-products', () => {
  return HttpResponse.json([
    {product: 'Queijo', amount: 10 },
    {product: 'Calabresa', amount: 34},
    {product: 'Frango', amount: 15},
    {product: 'Brócolis', amount: 22},
    {product: 'Manjericão', amount: 30},
  ])
})
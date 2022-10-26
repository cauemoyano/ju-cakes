import { INavLink } from "../components/navigation/navbar/MainNavbar/LinksBox";
import { getCollection } from "../services/FirebaseStorageService/FirebaseStorageService";
import { Category } from "./Types/Category";

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const attachProductsCategoriesToLinks = async (links: INavLink[]) => {
  const categories = (await getCollection("categories")) as Category[];
  const newProductsLink = {
    name: "PRODUTOS",
    path: null,
    sublinks: categories
      .filter(({ published }) => published)
      .map(({ name, id }) => ({ name, path: `/categoria/${id}` })),
  };
  const index = links.findIndex(({ name }) => name === "PRODUTOS");
  const newLinks = [...links];
  newLinks.splice(index, 1, newProductsLink);
  return newLinks;
};

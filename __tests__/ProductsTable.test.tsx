import { ChakraProvider } from "@chakra-ui/react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProductsTable from "../components/admin/AdminProducts/ProductsTable";
import { ProductsProvider } from "../context/ProductsContext";
import theme from "../styles/chakra/theme";

const imageString = "url";
jest.mock("../services/useCloudinary/useCloudinary", () => ({
  __esModule: true,
  default: () => ({
    uploadFile: jest.fn((file: File) =>
      Promise.resolve({ secure_url: imageString })
    ),
  }),
}));
const mockGetCollection = jest.fn();
const mockCreateDoc = jest.fn();
const mockUpdateDoc = jest.fn();
const mockDeleteDoc = jest.fn();
jest.mock("../services/useFirebaseStorage/useFirebaseStorage", () => ({
  useFirebaseStorage: jest.fn().mockImplementation(() => ({
    getCollection: mockGetCollection,
    createDoc: mockCreateDoc,
    updateDoc: mockUpdateDoc,
    deleteDocument: mockDeleteDoc,
  })),
}));

jest.setTimeout(30000);

const setup = () => {
  const user = userEvent.setup();
  render(
    <ChakraProvider resetCSS={true} theme={theme}>
      <ProductsProvider>
        <ProductsTable />
      </ProductsProvider>
    </ChakraProvider>
  );
  return { user };
};

let file: File;
const productData = {
  name: "New Product",
  category: "Muffins",
  price: 10.99,
  description: "Some description",
  image: "url",
  variant: "20 Unidades",
  ingredients: "Some ingredients list",
};
describe("Products table functionality", () => {
  beforeEach(() => {
    file = new File(["(⌐□_□)"], "image.png", { type: "image/png" });
    jest.resetModules();
  });
  test("renders loading message which dissapears once finished loading", async () => {
    mockGetCollection.mockImplementation(() => Promise.resolve([]));

    setup();

    const loading = screen.queryByTestId("loading-products");
    expect(mockGetCollection).toHaveBeenCalled();
    await waitForElementToBeRemoved(loading);

    expect(loading).not.toBeInTheDocument();
    expect(screen.queryByTestId("no-products")).toBeInTheDocument();
  });
  test("renders message if there's no products to display", async () => {
    mockGetCollection.mockImplementation(() => Promise.resolve([]));

    setup();

    const loading = screen.queryByTestId("loading-products");
    expect(mockGetCollection).toHaveBeenCalled();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();
    expect(screen.queryByTestId("no-products")).toBeInTheDocument();
  });
  test("Should display empty option in the category modal field, if no category fetched", async () => {
    mockGetCollection.mockImplementation(() => Promise.resolve([]));

    const { user } = setup();

    await waitForElementToBeRemoved(screen.queryByTestId("loading-products"));

    const addButton = screen.getByText(/adicionar produto/i);
    user.click(addButton);

    await waitFor(() =>
      expect(screen.getByText("Adicionar/Editar Produto")).toBeInTheDocument()
    );

    const noCatOption = screen.getByTestId("no-category-options");
    expect(noCatOption).toBeInTheDocument();
  });
  test("Should display categories fetched on category modal field", async () => {
    const db = {
      categories: [{ name: "Brownies", image: "url", id: "xyz10" }],
      products: [],
    };
    mockGetCollection.mockImplementation((collectionName: keyof typeof db) =>
      Promise.resolve(db[collectionName])
    );

    const { user } = setup();

    await waitForElementToBeRemoved(screen.queryByTestId("loading-products"));

    const addButton = screen.getByText(/adicionar produto/i);
    user.click(addButton);

    await waitFor(() =>
      expect(screen.getByText("Adicionar/Editar Produto")).toBeInTheDocument()
    );

    const noCatOption = screen.queryByTestId("no-category-options");
    expect(noCatOption).not.toBeInTheDocument();

    const catOptions = screen.queryAllByTestId("category-option");
    expect(catOptions.length).toBe(1);
  });
  test("add a product", async () => {
    const db = {
      categories: [{ name: "Muffins", image: "url", id: "xyz10" }],
      products: [],
    };
    mockGetCollection.mockImplementation((collectionName: keyof typeof db) =>
      Promise.resolve(db[collectionName])
    );
    mockCreateDoc.mockImplementation(
      (collectionName: string, data: { [key: string]: any }) =>
        Promise.resolve(() => {
          return data;
        })
    );

    const { user } = setup();

    const loading = screen.queryByTestId("loading-products");
    await waitForElementToBeRemoved(loading);

    expect(screen.getByTestId("no-products")).toBeInTheDocument();

    const addButton = screen.getByText(/adicionar produto/i);
    user.click(addButton);

    await waitFor(async () => {
      const form = screen.queryByText("Adicionar/Editar Produto");
      expect(form).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/nome/i) as HTMLInputElement;
    await user.type(nameInput, productData.name);

    const catInput = screen.getByLabelText(/categoria/i) as HTMLInputElement;
    user.selectOptions(catInput, productData.category);

    const priceInput = screen.getByLabelText(/Preço/i) as HTMLInputElement;
    await user.type(priceInput, productData.price.toString());

    const descInput = screen.getByLabelText(/Descrição/i) as HTMLInputElement;
    await user.type(descInput, productData.description);

    const ingrInput = screen.getByLabelText(
      /Ingredientes/i
    ) as HTMLInputElement;
    await user.type(ingrInput, productData.ingredients);

    const variant = screen.getByLabelText("Variante");
    user.selectOptions(variant, productData.variant);

    const imgInput = screen.getByLabelText(/imagem/i);
    user.upload(imgInput, file);

    const saveButton = screen.getByRole("button", { name: "Salvar" });
    user.click(saveButton);

    await waitFor(async () => {
      expect(screen.queryByText(/Produto Salvo/i)).toBeInTheDocument();
    });

    expect(mockCreateDoc).toHaveBeenCalledTimes(1);
    expect(mockCreateDoc).toHaveBeenCalledWith("products", productData);
  });
  test("edit a product", async () => {
    const testId = "abc99";
    const db = {
      categories: [{ name: "Muffins", image: "url", id: "xyz10" }],
      products: [{ ...productData, id: testId }],
    };
    mockGetCollection.mockImplementation((collectionName: keyof typeof db) =>
      Promise.resolve(db[collectionName])
    );
    mockUpdateDoc.mockImplementation(
      (collectionName: string, data: { [key: string]: any }) =>
        Promise.resolve(() => {
          return data;
        })
    );

    const { user } = setup();

    const loading = screen.queryByTestId("loading-products");
    await waitForElementToBeRemoved(loading);

    const prodRow = screen.getByTestId(testId);
    expect(prodRow).toBeInTheDocument();

    const editBtn = prodRow.querySelector(
      "[data-testid=prod-edit-btn]"
    ) as HTMLButtonElement;
    user.click(editBtn);

    await waitFor(async () => {
      const form = screen.queryByText("Adicionar/Editar Produto");
      expect(form).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/nome/i) as HTMLInputElement;
    user.clear(nameInput);
    await user.type(nameInput, "Edited product");

    const descInput = screen.getByLabelText(/Descrição/i) as HTMLInputElement;
    user.clear(descInput);
    await user.type(descInput, "Edited description");

    const saveButton = screen.getByRole("button", { name: "Salvar" });
    user.click(saveButton);

    await waitFor(async () => {
      expect(screen.queryByText(/Produto Salvo/i)).toBeInTheDocument();
    });

    expect(mockUpdateDoc).toHaveBeenCalledTimes(1);
    expect(mockUpdateDoc).toHaveBeenCalledWith("products", testId, {
      ...productData,
      id: testId,
      name: "Edited product",
      description: "Edited description",
    });
  });
  test("delete a category", async () => {
    const testId = "xyz10";
    mockGetCollection.mockImplementation(() =>
      Promise.resolve([{ ...productData, id: testId }])
    );

    const { user } = setup();

    const loading = screen.queryByTestId("loading-products");
    await waitForElementToBeRemoved(loading);

    const prodRow = screen.getByTestId(testId);
    expect(prodRow).toBeInTheDocument();

    const editBtn = prodRow.querySelector(
      "[data-testid=prod-delete-btn]"
    ) as HTMLButtonElement;
    user.click(editBtn);

    await waitFor(() =>
      expect(
        screen.getByText(/Tem certeza que deseja deletar esse produto/i)
      ).toBeInTheDocument()
    );

    const confirmBtn = screen.getByRole("button", { name: "Deletar" });
    user.click(confirmBtn);

    await waitFor(() =>
      expect(screen.queryByText(/com sucesso/i)).toBeInTheDocument()
    );

    expect(mockDeleteDoc).toHaveBeenCalledTimes(1);
    expect(mockDeleteDoc).toHaveBeenCalledWith(testId, "products");
  });
});

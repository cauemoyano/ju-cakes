import {
  fireEvent,
  queryByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import theme from "../styles/chakra/theme";
import CategoriesTable from "../components/admin/AdminProducts/CategoriesTable";
import { ProductsProvider } from "../context/ProductsContext";

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

const setup = () => {
  const user = userEvent.setup();
  render(
    <ChakraProvider resetCSS={true} theme={theme}>
      <ProductsProvider>
        <CategoriesTable />
      </ProductsProvider>
    </ChakraProvider>
  );
  return { user };
};
let file: File;
describe("Categories table functionality", () => {
  beforeEach(() => {
    file = new File(["(⌐□_□)"], "image.png", { type: "image/png" });
    jest.resetModules();
  });

  test("renders loading message which dissapears once finished loading", async () => {
    mockGetCollection.mockImplementation(() => Promise.resolve([]));

    setup();

    const loading = screen.queryByTestId("loading-categories");
    expect(mockGetCollection).toHaveBeenCalled();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();
  });

  test("renders message if there's no category to display", async () => {
    mockGetCollection.mockImplementation(() => Promise.resolve([]));
    setup();

    await waitForElementToBeRemoved(screen.queryByTestId("loading-categories"));
    expect(mockGetCollection).toHaveBeenCalled();
    const message = screen.getByTestId("no-categories");
    expect(message).toBeInTheDocument();
  });

  test("add a category", async () => {
    mockGetCollection.mockImplementation(() => Promise.resolve([]));
    mockCreateDoc.mockImplementation(
      (collectionName: string, data: { [key: string]: any }) =>
        Promise.resolve(() => {
          return data;
        })
    );

    const { user } = setup();

    const loading = screen.queryByTestId("loading-categories");
    await waitForElementToBeRemoved(loading);

    expect(screen.getByTestId("no-categories")).toBeInTheDocument();

    const addButton = screen.getByText(/adicionar categoria/i);
    fireEvent.click(addButton);

    //add cat through modal
    const nameInput = screen.getByLabelText(/nome/i);
    await user.type(nameInput, "Brownies");

    const imgInput = screen.getByLabelText(/imagem/i);
    user.upload(imgInput, file);

    const saveButton = screen.getByRole("button", { name: "Salvar" });
    user.click(saveButton);

    await waitFor(async () => {
      expect(screen.queryByText(/Categoria salva/i)).toBeInTheDocument();
    });
    expect(mockCreateDoc).toHaveBeenCalledWith("categories", {
      name: "Brownies",
      image: imageString,
    });
    expect(mockGetCollection).toHaveBeenCalled();
  });

  test("edit a category", async () => {
    const testId = "xyz10";
    mockGetCollection.mockImplementation(() =>
      Promise.resolve([{ name: "Brownies", id: testId }])
    );
    mockUpdateDoc.mockImplementation((data: any) =>
      Promise.resolve(
        (collectionName: string, id: string, data: { [key: string]: any }) => {
          return data;
        }
      )
    );

    const { user } = setup();

    const loading = screen.queryByTestId("loading-categories");
    await waitForElementToBeRemoved(loading);

    const catRow = screen.getByTestId(testId);
    expect(catRow).toBeInTheDocument();

    const editBtn = catRow.querySelector(
      "[data-testid=cat-edit-btn]"
    ) as HTMLButtonElement;
    user.click(editBtn);

    await waitFor(
      async () => {
        const nameInput = screen.queryByLabelText(/nome/i) as HTMLInputElement;
        expect(nameInput).toBeInTheDocument();
        user.clear(nameInput);
        await user.type(nameInput, "Brownies edited", {
          initialSelectionStart: 0,
          initialSelectionEnd: 0,
        });
      },
      { timeout: 3000 }
    );

    const imgInput = screen.getByLabelText(/imagem/i);
    user.upload(imgInput, file);

    const saveButton = screen.getByRole("button", { name: "Salvar" });
    user.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByText(/Categoria salva/i)).toBeInTheDocument();
    });

    expect(mockUpdateDoc).toHaveBeenCalledWith("categories", testId, {
      name: "Brownies edited",
      id: testId,
      image: imageString,
    });
    expect(mockGetCollection).toHaveBeenCalled();
  });
  test("delete a category", async () => {
    const testId = "xyz10";
    mockGetCollection.mockImplementation(() =>
      Promise.resolve([{ name: "Brownies", id: testId }])
    );

    const { user } = setup();

    const loading = screen.queryByTestId("loading-categories");
    await waitForElementToBeRemoved(loading);

    const catRow = screen.getByTestId(testId);
    expect(catRow).toBeInTheDocument();

    const deleteBtn = catRow.querySelector(
      "[data-testid=cat-delete-btn]"
    ) as HTMLButtonElement;
    user.click(deleteBtn);

    await waitFor(() =>
      expect(
        screen.getByText(/Tem certeza que deseja deletar essa categoria/i)
      ).toBeInTheDocument()
    );

    const confirmBtn = screen.getByRole("button", { name: "Deletar" });
    user.click(confirmBtn);

    await waitFor(() =>
      expect(screen.queryByText(/com sucesso/i)).toBeInTheDocument()
    );

    expect(mockDeleteDoc).toHaveBeenCalledWith(testId, "categories");
  });
});

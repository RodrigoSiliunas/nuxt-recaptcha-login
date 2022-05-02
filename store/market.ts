import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { Product } from "@/models";
import { $axios } from "~/utils/nuxt-instance";
import Store from "@/store/Store";

@Module({
  name: "market",
  namespaced: true,
  stateFactory: true,
  store: Store
})
export default class Market extends VuexModule {
  private products = [] as Product[];
  private productsInBag = [] as Product[];

  public get $all() {
    return this.products;
  }

  public get $productsInBag() {
    return this.productsInBag;
  }

  @Mutation
  private SET_ALL(arrayProduct: Product[]) {
    this.products = arrayProduct;
  }

  @Mutation
  private ADD_TO_BAG(product: Product) {
    this.productsInBag.push(product);
    localStorage.setItem("productsInBag", JSON.stringify(this.productsInBag));
  }

  @Mutation
  private REMOVE_FROM_BAG(product: Product) {
    const updatedBag = this.productsInBag.filter(
      (element) => element.id !== product.id
    );
    this.productsInBag = updatedBag;
    localStorage.setItem("productsInBag", JSON.stringify(this.productsInBag));
  }

  @Mutation
  private LOAD_BAG(product: any) {
    this.productsInBag = product;
  }

  @Action
  public addToBag(product: Product) {
    this.context.commit("ADD_TO_BAG", product);
  }

  @Action
  public removeFromBag(product: Product) {
    if (
      confirm("Você tem certeza que quer remover esse produto do seu carrinho?")
    ) {
      this.context.commit("REMOVE_FROM_BAG", product);
    }
  }

  @Action
  public loadBag() {
    if (localStorage.getItem("productsInBag") != null) {
      this.context.commit(
        "LOAD_BAG",
        JSON.parse(localStorage.getItem("productsInBag") || "{}")
      );
    }
  }

  @Action
  public async index() {
    const products = await $axios
      .get("/products")
      .then((res) => res.data)
      .catch((err) => console.log(err));

    this.context.commit("SET_ALL", products);
  }
}
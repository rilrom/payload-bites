import { Pexels } from "./Pexels.js";
import { Unsplash } from "./Unsplash.js";
import { Pixabay } from "./Pixabay.js";

export class ProviderManager {
  static getProviders() {
    const providers = [Unsplash, Pexels, Pixabay];

    return providers
      .map((Provider) => new Provider())
      .filter((provider) => provider.isConfigured);
  }

  static getProvider(providerName?: string) {
    switch (providerName) {
      case "unsplash":
        return new Unsplash();
      case "pexels":
        return new Pexels();
      case "pixabay":
        return new Pixabay();
      default:
        return null;
    }
  }
}

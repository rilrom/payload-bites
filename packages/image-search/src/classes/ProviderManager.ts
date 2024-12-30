import { Pexels } from "./Pexels.js";
import { Unsplash } from "./Unsplash.js";

export class ProviderManager {
  static getProviders() {
    const providers = [Unsplash, Pexels];

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
      default:
        return null;
    }
  }
}

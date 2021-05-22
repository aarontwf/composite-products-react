import CompositeProduct from "../models/CompositeProduct";
import Product from "../models/Product";
import ProductService from "./ProductService";

interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

class OnlineProductService implements ProductService {
    readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getProducts(): Promise<Product[]> {
        const response = await this.http<Product[]>(
            `${this.url}/products`,
            { method: 'GET' }
        );
        return response.parsedBody!;
    }

    async getCompositeProducts(): Promise<CompositeProduct[]> {
        const response = await this.http<CompositeProduct[]>(
            `${this.url}/composite-products`,
            { method: 'GET' }
        );
        return response.parsedBody!;
    }

    async getCompositeProductById(id: string): Promise<CompositeProduct> {
        const response = await this.http<CompositeProduct>(
            `${this.url}/composite-products/${id}`,
            { method: 'GET' }
        );
        return response.parsedBody!;
    }

    async createCompositeProduct(product: CompositeProduct): Promise<void> {
        await this.http<void>(
            `${this.url}/composite-products`,
            {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(product)
            }
        );
    }

    async updateCompositeProduct(product: CompositeProduct): Promise<void> {
        await this.http<void>(
            `${this.url}/composite-products/${product.id}`,
            {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(product)
            }
        );
    }

    private async http<T>(request: RequestInfo, init?: RequestInit): Promise<HttpResponse<T>> {
        const response: HttpResponse<T> = await fetch(request, init);

        try {
            response.parsedBody = await response.json();
        } catch (exception) {
            // May throw if there is no body, ignore as may not be expecting a response body
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    }
}

export default OnlineProductService;

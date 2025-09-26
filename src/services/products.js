import { DirectusBaseService } from '@/services/base';
import { formatPercentage, formatCEST, formatNCM, formatCurrency } from "@/utils/formatters";
import { ApiBaseService } from '@/services/base';

class ProductService extends DirectusBaseService {
    constructor() {
        super('products');
    }

    async getProducts() {
        const response = await this.readItems();
        const data = response?.data?.data

        return data.map(product => {
            return {
                ...product,
                purchase_cost: formatCurrency(product.purchase_cost),
                cest: formatCEST(product.cest),
                ncm: formatNCM(product.ncm),
            }
        })
    }
}

class ProductServiceApi extends ApiBaseService {
    constructor() {
        super('query/products');
    }

    async getProductMetricsById(id) {
        const data = await this.readItem("metrics", { id });
        if (data.length > 0) {
            return [
                {
                    label: "Percentual de lucro",
                    value: formatPercentage(data[0].profit_percentage),
                    description: `${data[0].sales_last_year} vendas no ano`
                }
            ]
        } else {
            return data
        }
    }
}

export const productServiceApi = new ProductServiceApi();
export const productService = new ProductService();
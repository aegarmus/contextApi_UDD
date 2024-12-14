import { useState, useEffect } from "react";
import { getAllProducts } from "../../services/productApi";
import { ProductItem } from "./ProductItem";

export const ProductList = () => {
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await getAllProducts();
                console.log(data)
                setProducts(data);
            } catch (err) {
                setError(`No se pudieron cargar los productos. ${err}`);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <p>Cargando Productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="product-list">
            {
                products.length > 0 ? (
                    products.map((product) => (
                        <ProductItem product={product} key={product._id} />
                    ))
                ) : (
                    <p>No hay productos disponibles.</p>
                )
            }
        </div>
    );
};
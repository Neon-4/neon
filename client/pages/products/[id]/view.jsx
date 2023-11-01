// pages/[id]/view.jsx
import { useRouter } from 'next/router';
import ProductDetails from '../../../components/ProductDetails'; // adjust the import path if necessary

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log('id:', id);

    // Check if the "id" is available. It might be undefined initially.
    // You could also do some loading logic here.
    if (!id) return <p>Loading...</p>;

    return <ProductDetails id={id} />;
}

export default ProductPage;

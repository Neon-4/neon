// components/CategoryItem.js
import Link from 'next/link';

const CategoryItem = ({ category }) => {
return (
    <div>
    <Link href={`/categories/${category.id}`}>
        <a>{category.name}</a>
    </Link>
    </div>
);
};

export default CategoryItem;

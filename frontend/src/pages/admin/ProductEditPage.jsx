import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../slices/productApiSlice";

const ProductEditPage = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    // get current product from "id" in params
    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    return (
        <>
            <Link 
                to="/admin/productlist" 
                className="btn btn-light my-3"
            >
                Go Back
            </Link>
        </>
    );
};

export default ProductEditPage;
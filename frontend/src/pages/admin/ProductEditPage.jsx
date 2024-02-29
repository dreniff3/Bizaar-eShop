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

    return (
        <div>ProductEditPage</div>
    );
};

export default ProductEditPage;
import React from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import Wrapper from "../../components/Wrapper"
import ProductForm, {ProductData} from "./ProductForm"

const ProductCreate = () => {
    let navigate = useNavigate()

    const submit = async (data: ProductData) => {
        await axios.post('products', data);
        navigate("/products")
    }

    return (
        <Wrapper>
            <ProductForm defaultValues={{
                title: "",
                description: "",
                image: "",
                price: 0
            }} submit={submit}/>
        </Wrapper>
    );
};

export default ProductCreate;
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios'
import Wrapper from "../../components/Wrapper"
import ProductForm, {ProductData} from "./ProductForm"

const ProductEdit = () => {
    const [defaultValues, setDefaultValues] = useState<ProductData>()
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`Products/${id}`);
                setDefaultValues(data)
            }
        )()
    }, [id])

    const submit = async (data: ProductData) => {
        await axios.put(`products/${id}`, data);
        navigate("/products")
    }

    return (
        <Wrapper>
            <ProductForm defaultValues={defaultValues} submit={submit}/>
        </Wrapper>
    );
};

export default ProductEdit
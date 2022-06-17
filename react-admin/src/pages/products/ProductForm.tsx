import React, {FC, useEffect} from "react"
import {useForm} from "react-hook-form"
import ImageUpload from "../../components/ImageUpload";

export interface ProductData {
    title: string
    description: string
    image: string
    price: number
}

interface ProductFormProps {
    defaultValues?: ProductData
    submit: (data: ProductData) => Promise<void>
}

const ProductForm: FC<ProductFormProps> = ({defaultValues, submit}) => {

    const {register, formState: {errors}, handleSubmit, setValue} = useForm<ProductData>()

    useEffect(() => {
        if (!!defaultValues) {
            setValue("title", defaultValues.title)
            setValue("description", defaultValues.description)
            setValue("image", defaultValues.image)
            setValue("price", defaultValues.price)
        }
    }, [defaultValues, setValue])

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input id="title" className="form-control" placeholder="Title" {...register('title', {required: "Title is required"})} />
                {errors.title && <div>{errors.title.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="title">Description</label>
                <input id="description" className="form-control" placeholder="Description" {...register('description', {required: "Description is required"})} />
                {errors.description && <div>{errors.description.message}</div>}
            </div>
            <div className="mb-3">
                <label>Image</label>
                <div className="input-group">
                    <input id="image" className="form-control" placeholder="Image" {...register('image')} />
                    <ImageUpload uploaded={(e)=>setValue("image", e)}/>
                    {errors.image && <div>{errors.image.message}</div>}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="title">Price</label>
                <input id="price" type="number" className="form-control" placeholder="Price" {...register('price', {required: "Price is required"})} />
                {errors.price && <div>{errors.price.message}</div>}
            </div>

            <button type="submit" className="btn btn-outline-secondary">Save</button>
        </form>
    )
}
export default ProductForm
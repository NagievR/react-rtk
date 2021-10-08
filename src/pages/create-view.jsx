import React from 'react'
import MainTitle from '../components/elements/MainTitle/MainTitle'
import ProductForm from '../components/layout/ProductForm/ProductForm'

export default function CreateView() {
  return (
    <div className="container">
      <MainTitle text="Create view" />
      <ProductForm />
    </div>
  )
}

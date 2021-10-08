import React from 'react'
import { useLocation } from 'react-router';

import MainTitle from '../components/elements/MainTitle/MainTitle';
import ProductForm from '../components/layout/ProductForm/ProductForm';

export default function EditView() {
  const product = useLocation().state;

  return (
    <div className="container">
      <MainTitle text="Edit view" />
      <ProductForm {...product} isUpdating />
    </div>
  )
}

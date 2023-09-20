import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import {GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";


interface ProductProps {
  product: {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
  }
}

export default function Product({
    product: {
      description, 
      id, 
      imageUrl, 
      name, 
      price
}}: ProductProps) {
    console.log(imageUrl);

    return (
      <ProductContainer>
        <ImageContainer>
          <Image 
            src={imageUrl} 
            alt="product image"
            width={30} 
            height={30}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{name}</h1>
          <span>{price}</span>

          <p>{description}</p>

          <button>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {params: {id: 'prod_OKZBQkKb8cXgao'}}
    ],
    fallback: false
  }
}


export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  const productId = params?.id;

  const product = await stripe.products.retrieve(productId as string, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1
  }
}

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { useRouter } from "next/router"

export default function Product() {
    const {query} = useRouter();

    return (
      <ProductContainer>
        <ImageContainer>

        </ImageContainer>

        <ProductDetails>
          <h1>Camiseta X</h1>
          <span>R$ 79,90</span>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, omnis distinctio? Esse possimus, placeat accusamus minima soluta temporibus nam distinctio quidem voluptate perferendis officiis doloremque illo quo rem nulla doloribus.</p>

          <button>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    )
  }
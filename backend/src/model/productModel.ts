import mongoose,{Document,Schema,model} from "mongoose";


export interface IProduct extends Document{
  name:string;
  price:number;
  image:string;

}

const ProductSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true

  },
  image: {
    type: String,
    required: true
  }
},{
  timestamps:true
});

const Product =model<IProduct>('Product',ProductSchema);

export default Product;

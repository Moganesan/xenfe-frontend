export interface productModelServer {
    id: number;
    name: string;
    cat_name: string;
    tag_name : string;
    description: string;
    image: string;
    images: string;
    price: number;
    trainer: string;
    quantity: number;
    short_desc: string;
    tax_id: any;
    tax_rule: any;
    tax_name: any;
    tax_rate: any;
    }

  export interface serverResponse  {
    count: number;
    products: productModelServer[]
  };



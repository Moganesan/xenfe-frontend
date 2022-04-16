import {productModelServer} from './products.model';


export interface QuoteModelServer {
    total: number;
  data: [{
    product: productModelServer,
    productId: number,
    numInQuote: number,
    discount: number
  }];
}

export interface taxSummary {
  // data: [{
  //   uniqueTaxvalue: any,
  //   totalValueOfUniqueTax: any
  // }]
  uniqueTaxvalue: any[],
  uniqueTaxId: any[],
  //uniqueTaxName: any[],

  totalValueOfUniqueTax: number[]
};


export interface quoteDetailModelServer {
  template_id: Number;
  quantity: Number;
  price: Number;
  product_id : Number;
  templateName: String;
  templateDesc: String;
  total: Number;
  userId: Number;
  updated: any;
  id: Number;
  priceWithTax: number;
  }


  export interface tempDetailModelServer {
    name: string;
    description: string;
    price: number;
    }

    export interface QuoteDetailModelServer {
      name: string;
      branch: string;
      total: number;
      }

export interface QuoteModelPublic {
  total: number;
  prodData: [
    {
      id: number,
      inquote: number,
      discount: any
    }
  ];
}

export interface QuoteTempModelServer {
  total: number;
  totalQuantity: number;
  product_details: [productModelServer];

data: [{
  product: productModelServer,
  productId: number,
  numInQuote: number,
  discount: any,
  price: number,
  discountPrice: any,
  cgst: number,
  cgst_rate: any,
  sgst_rate: any,
  igst_rate: any,
  sgst: any,
  igst: any,
  tax: any,
  sgst1: any,
  igst1: any,
  cgst1: number,
  linetotal: any,
  priceInclTax: any,
  lineDiscountPrice: any,
  tax_id: any,
  tax_name: any,
  isEdit: boolean,
  editSelect: boolean,
  exist: boolean,
  UpSave: boolean,
  QDId: number,
  linetax: any,
  lineDiscountPriceExclTax: any,

}];

}

export interface QuoteTempModelPublic {
total: number;
prodData: [
  {
    id: number,
    inquote: number,
    price: number,
    taxRate: number,
    lineTotal: number,
    discount: any,
    cgst: any,
    sgst: any,
    igst: any,
    tax_id: any
   }
];
}

export interface templateModelServer {
  Template_id: Number;
  name: String;
  description: String;
  total : Number;
  updated: any;
  user_id: Number;
  product_id: Number;
  quantity: Number;
  }

export interface serverResponse  {
  count: number;
  templates: templateModelServer[]
};


export interface packModelServer {
BQ: number;
Quantity: number;
backorder_id: number;
balance_quantity: number;
checkValue: false;
customer_id: number;
discount: any;
id: number;
line_discount_price: any;
line_total: any;
price: any;
price_after_tax: any;
product_id: number;
quantity: number;
shipped_quantity: number;
tax: any;
tax_rate: number;
title: any;
updated: any;
  }


  export class Account {
    id: string;
    facebookId: string;
    name: string;
    extraInfo: string;
    token?: string;
}

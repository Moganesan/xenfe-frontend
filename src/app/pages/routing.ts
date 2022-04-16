import { Routes } from '@angular/router';
import { CreatePosOrderComponent } from './create-pos-order/create-pos-order.component';
import { MyPageComponent } from './my-page/my-page.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { SimpleTestPageComponent } from './simple-test-page/simple-test-page.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { QuotationCreateComponent } from './quotation-create/quotation-create.component';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { QuotationEditComponent } from './quotation-edit/quotation-edit.component';
import { BackorderCreateComponent } from './backorder-create/backorder-create.component';
import { BackorderViewComponent } from './backorder-view/backorder-view.component';
import { BackorderEditComponent } from './backorder-edit/backorder-edit.component';
import { BackorderListComponent } from './backorder-list/backorder-list.component';
import { OrdersToPackComponent } from './orders-to-pack/orders-to-pack.component';
import { OrderToPackViewComponent } from './order-to-pack-view/order-to-pack-view.component';
import { OrderToPackShipComponent } from './order-to-pack-ship/order-to-pack-ship.component';
import { UnbilledComponent } from './unbilled/unbilled.component';
import { UnbilledProductsComponent } from './unbilled-products/unbilled-products.component';
import { BillComponent } from './bill/bill.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceTestComponent } from './invoice-test/invoice-test.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { LeadsComponent } from './leads/leads.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ExcelImportTestComponent } from './excel-import-test/excel-import-test.component';
import { Invoice1Component } from './invoice1/invoice1.component';
import { Invoice2Component } from './invoice2/invoice2.component';
import { Invoice3Component } from './invoice3/invoice3.component';
import { Invoice4Component } from './invoice4/invoice4.component';
import { QuotationTemplateCreateComponent } from './quotation-template-create/quotation-template-create.component';
import { QuotationTemplateListComponent } from './quotation-template-list/quotation-template-list.component';
import { QuotationTemplateEditComponent } from './quotation-template-edit/quotation-template-edit.component';
import { QuotationTemplateViewComponent } from './quotation-template-view/quotation-template-view.component';
import { LeadsListComponent } from './leads-list/leads-list.component';
import { LeadViewComponent } from './lead-view/lead-view.component';
import { TaxInvoiceComponent } from './tax-invoice/tax-invoice.component';
import { CashInvoiceComponent } from './cash-invoice/cash-invoice.component';
import { CashInvoiceViewComponent } from './cash-invoice-view/cash-invoice-view.component';
import { TaxInvoiceViewComponent } from './tax-invoice-view/tax-invoice-view.component';
import { DeliverychallanListComponent } from './deliverychallan-list/deliverychallan-list.component';
import { DeliverychallanViewComponent } from './deliverychallan-view/deliverychallan-view.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CreateDiscountGroupComponent } from './create-discount-group/create-discount-group.component';
import { TaxComponent } from './tax/tax.component';




const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  // {
  //   path: 'order-list',
  //   loadChildren: () =>
  //     import('./pos/pos.module').then((m) => m.PosModule),
  // },
  // {
  // path: 'create_pos',
  // loadChildren: () =>
  //   import('./create-pos/create-pos.module').then((m) => m.CreatePosModule),
  // },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
  {
       path: 'my-page', // <= Page URL
       component: MyPageComponent // <= Page component registration
  },
  {
    path: 'createPOS', // <= Page URL
    component: OrderListComponent // <= Page component registration
},
{
  path: 'test', // <= Page URL
  component: SimpleTestPageComponent // <= Page component registration
},
{
  path: 'createPosOrder', // <= Page URL
  component: CreatePosOrderComponent // <= Page component registration
},
{
  path: 'ordersList', // <= Page URL
  component: OrdersListComponent // <= Page component registration
},
{
  path: 'ordersList/order/:id', // <= Page URL
  component: OrderViewComponent // <= Page component registration
},
{
  path: 'ordersList/editOrder/:id', // <= Page URL
  component: OrderEditComponent // <= Page component registration
},
{
  path: 'quotationList/createQuotation', // <= Page URL
  component: QuotationCreateComponent // <= Page component registration
},
{
  path: 'quotationList/viewQuotation/:id', // <= Page URL
  component: QuotationViewComponent // <= Page component registration
},
{
  path: 'quotationList', // <= Page URL
  component: QuotationListComponent // <= Page component registration
},
{
  path: 'quotationList/viewQuotation/quotationEdit/:id', // <= Page URL
  component: QuotationEditComponent // <= Page component registration
},
{
  path: 'backorderList/backorderCreate', // <= Page URL
  component: BackorderCreateComponent // <= Page component registration
},
{
  path: 'backorderList/backorderView/:id', // <= Page URL
  component: BackorderViewComponent // <= Page component registration
},
{
  path: 'backorderList/backorderView/backorderEdit/:id', // <= Page URL
  component: BackorderEditComponent // <= Page component registration
},
{
  path: 'backorderList', // <= Page URL
  component: BackorderListComponent // <= Page component registration
},
{
  path: 'ordersToPack', // <= Page URL
  component: OrdersToPackComponent // <= Page component registration
},
{
  path: 'ordersToPack/:id', // <= Page URL
  component: OrderToPackViewComponent // <= Page component registration
},
{
  path: 'ordersToPack/packingPage/:id', // <= Page URL
  component: OrderToPackShipComponent // <= Page component registration
},
{
  path: 'unbilled', // <= Page URL
  component: UnbilledComponent // <= Page component registration
},
{
  path: 'unbilled/:id', // <= Page URL
  component: UnbilledProductsComponent // <= Page component registration
},
{
  path: 'unbilled/bill/:id', // <= Page URL
  component: BillComponent // <= Page component registration
},
{
  path: 'invoice/:id', // <= Page URL
  component: InvoiceComponent // <= Page component registration
},
{
  path: 'invoiceTest', // <= Page URL
  component: InvoiceTestComponent // <= Page component registration
},
{
  path: 'categoryCreate', // <= Page URL
  component: CategoryCreateComponent // <= Page component registration
},
{
  path: 'categoryList', // <= Page URL
  component: CategoryListComponent // <= Page component registration
},
{
  path: 'categoryEdit/:id', // <= Page URL
  component: CategoryEditComponent // <= Page component registration
},
{
  path: 'productCreate', // <= Page URL
  component: ProductCreateComponent // <= Page component registration
},
{
  path: 'leads', // <= Page URL
  component: LeadsListComponent // <= Page component registration
},
{
  path: 'leads/create', // <= Page URL
  component: LeadsComponent // <= Page component registration
},
{
  path: 'leads/view/:id', // <= Page URL
  component: LeadViewComponent // <= Page component registration
},
{
  path: 'productsAll', // <= Page URL
  component: ProductsListComponent // <= Page component registration
},
{
  path: 'productEdit/:id', // <= Page URL
  component: ProductEditComponent // <= Page component registration
},
{
  path: 'excel', // <= Page URL
  component: ExcelImportTestComponent // <= Page component registration
},
{
  path: 'invoice1', // <= Page URL
  component: Invoice1Component // <= Page component registration
},
{
  path: 'invoice2', // <= Page URL
  component: Invoice2Component // <= Page component registration
},
{
  path: 'invoice3', // <= Page URL
  component: Invoice3Component // <= Page component registration
},
{
  path: 'invoice4', // <= Page URL
  component: Invoice4Component // <= Page component registration
},
{
  path: 'quotationTemplateList/quotationTemplateCreate', // <= Page URL
  component: QuotationTemplateCreateComponent // <= Page component registration
},
{
  path: 'quotationTemplateList', // <= Page URL
  component: QuotationTemplateListComponent // <= Page component registration
},
{
  path: 'quotationTemplateList/quotationTemplateView/:id', // <= Page URL
  component: QuotationTemplateViewComponent // <= Page component registration
},
{
  path: 'quotationTemplateList/quotationTemplateView/quotationTemplateEdit/:id', // <= Page URL
  component: QuotationTemplateEditComponent // <= Page component registration
},
{
  path: 'taxInvoiceList', // <= Page URL
  component: TaxInvoiceComponent // <= Page component registration
},
{
  path: 'cashInvoiceList', // <= Page URL
  component: CashInvoiceComponent // <= Page component registration
},
{
  path: 'cashInvoiceList/view/:id', // <= Page URL
  component: CashInvoiceViewComponent // <= Page component registration
},
{
  path: 'taxInvoiceList/view/:id', // <= Page URL
  component: TaxInvoiceViewComponent // <= Page component registration
},
{
  path: 'deliveryChallanList', // <= Page URL
  component: DeliverychallanListComponent // <= Page component registration
},
{
  path: 'deliveryChallanList/view/:id', // <= Page URL
  component: DeliverychallanViewComponent // <= Page component registration
},
{
  path: 'companyProfile', // <= Page URL
  component: CompanyProfileComponent // <= Page component registration
},
{
  path: 'discountGroups', // <= Page URL
  component: CreateDiscountGroupComponent // <= Page component registration
},
{
  path: 'tax', // <= Page URL
  component: TaxComponent // <= Page component registration
},
];

export { Routing };

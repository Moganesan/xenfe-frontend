import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { ClipboardModule } from "ngx-clipboard";
import { TranslateModule } from "@ngx-translate/core";
import { InlineSVGModule } from "ng-inline-svg";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./modules/auth/services/auth.service";
import { environment } from "src/environments/environment";
import { NgxPrintModule } from "ngx-print";
import { FileSaverModule } from "ngx-filesaver";

// #fake-start#
import { FakeAPIService } from "./_fake/fake-api.service";
// #fake-end#
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyPageComponent } from "./pages/my-page/my-page.component";
import { AddCustomerAsComponent } from "./pages/add-customer-as/add-customer-as.component";
import { OrderListComponent } from "./pages/order-list/order-list.component";
import { OrdersListComponent } from "./pages/orders-list/orders-list.component";
import { SimpleTestPageComponent } from "./pages/simple-test-page/simple-test-page.component";
import { CreatePosOrderComponent } from "./pages/create-pos-order/create-pos-order.component";
import { AddCustomerAddressAdminSideComponent } from "./pages/add-customer-address-admin-side/add-customer-address-admin-side.component";
import { OrderViewComponent } from "./pages/order-view/order-view.component";
import { OrderEditComponent } from "./pages/order-edit/order-edit.component";
import { QuotationCreateComponent } from "./pages/quotation-create/quotation-create.component";
import { QuotationViewComponent } from "./pages/quotation-view/quotation-view.component";
import { QuotationListComponent } from "./pages/quotation-list/quotation-list.component";
import { QuotationEditComponent } from "./pages/quotation-edit/quotation-edit.component";
import { BackorderListComponent } from "./pages/backorder-list/backorder-list.component";
import { BackorderCreateComponent } from "./pages/backorder-create/backorder-create.component";
import { BackorderViewComponent } from "./pages/backorder-view/backorder-view.component";
import { BackorderEditComponent } from "./pages/backorder-edit/backorder-edit.component";
import { OrdersToPackComponent } from "./pages/orders-to-pack/orders-to-pack.component";
import { OrderToPackViewComponent } from "./pages/order-to-pack-view/order-to-pack-view.component";
import { OrderToPackShipComponent } from "./pages/order-to-pack-ship/order-to-pack-ship.component";
import { UnbilledComponent } from "./pages/unbilled/unbilled.component";
import { UnbilledProductsComponent } from "./pages/unbilled-products/unbilled-products.component";
import { BillComponent } from "./pages/bill/bill.component";
import { InvoiceComponent } from "./pages/invoice/invoice.component";
import { InvoiceTestComponent } from "./pages/invoice-test/invoice-test.component";
import { CategoryCreateComponent } from "./pages/category-create/category-create.component";
import { CategoryListComponent } from "./pages/category-list/category-list.component";
import { CategoryEditComponent } from "./pages/category-edit/category-edit.component";
import { ProductCreateComponent } from "./pages/product-create/product-create.component";
import { LeadsComponent } from "./pages/leads/leads.component";
import { ProductsListComponent } from "./pages/products-list/products-list.component";
import { ProductEditComponent } from "./pages/product-edit/product-edit.component";
import { ExcelImportTestComponent } from "./pages/excel-import-test/excel-import-test.component";
import { Invoice1Component } from "./pages/invoice1/invoice1.component";
import { Invoice2Component } from "./pages/invoice2/invoice2.component";
import { Invoice3Component } from "./pages/invoice3/invoice3.component";
import { Invoice4Component } from "./pages/invoice4/invoice4.component";
import { QuotationTemplateCreateComponent } from "./pages/quotation-template-create/quotation-template-create.component";
import { QuotationTemplateListComponent } from "./pages/quotation-template-list/quotation-template-list.component";
import { QuotationTemplateEditComponent } from "./pages/quotation-template-edit/quotation-template-edit.component";
import { QuotationTemplateViewComponent } from "./pages/quotation-template-view/quotation-template-view.component";
import { MatSelectSearchModule } from "mat-select-search";
import { LeadsListComponent } from "./pages/leads-list/leads-list.component";
import { LeadViewComponent } from "./pages/lead-view/lead-view.component";
import { TaxInvoiceComponent } from "./pages/tax-invoice/tax-invoice.component";
import { CashInvoiceComponent } from "./pages/cash-invoice/cash-invoice.component";
import { TaxInvoiceViewComponent } from "./pages/tax-invoice-view/tax-invoice-view.component";
import { CashInvoiceViewComponent } from "./pages/cash-invoice-view/cash-invoice-view.component";
import { DeliverychallanListComponent } from "./pages/deliverychallan-list/deliverychallan-list.component";
import { DeliverychallanViewComponent } from "./pages/deliverychallan-view/deliverychallan-view.component";
import { CompanyProfileComponent } from "./pages/company-profile/company-profile.component";
import { CreateDiscountGroupComponent } from "./pages/create-discount-group/create-discount-group.component";
import { TaxComponent } from "./pages/tax/tax.component";

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MyPageComponent,
    AddCustomerAsComponent,
    OrderListComponent,
    OrdersListComponent,
    SimpleTestPageComponent,
    CreatePosOrderComponent,
    AddCustomerAddressAdminSideComponent,
    OrderViewComponent,
    OrderEditComponent,
    QuotationCreateComponent,
    QuotationViewComponent,
    QuotationListComponent,
    QuotationEditComponent,
    BackorderListComponent,
    BackorderCreateComponent,
    BackorderViewComponent,
    BackorderEditComponent,
    OrdersToPackComponent,
    OrderToPackViewComponent,
    OrderToPackShipComponent,
    UnbilledComponent,
    UnbilledProductsComponent,
    BillComponent,
    InvoiceComponent,
    InvoiceTestComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    CategoryEditComponent,
    ProductCreateComponent,
    LeadsComponent,
    ProductsListComponent,
    ProductEditComponent,
    ExcelImportTestComponent,
    Invoice1Component,
    Invoice2Component,
    Invoice3Component,
    Invoice4Component,
    QuotationTemplateCreateComponent,
    QuotationTemplateListComponent,
    QuotationTemplateEditComponent,
    QuotationTemplateViewComponent,
    LeadsListComponent,
    LeadViewComponent,
    TaxInvoiceComponent,
    CashInvoiceComponent,
    TaxInvoiceViewComponent,
    CashInvoiceViewComponent,
    DeliverychallanListComponent,
    DeliverychallanViewComponent,
    CompanyProfileComponent,
    CreateDiscountGroupComponent,
    TaxComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    NgxPrintModule,
    FormsModule,
    FormsModule,
    FileSaverModule,
    ReactiveFormsModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    MatSelectSearchModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

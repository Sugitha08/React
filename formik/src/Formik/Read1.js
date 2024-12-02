import React, { useEffect, useState, useRef } from "react";
import { API_URL } from "../API_URL/url";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";


function Read1() {
  const Navigate = useNavigate();
  const emptyData = {
    username: "",
    email: "",
    dob: "",
    password: "",
    cpassword: "",
    mobile: "",
    nationality: "",
    gender: "",
    languages: [],
  };
  const [userdata, setUserData] = useState([]);
  const [product, setProduct] = useState(emptyData);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    mobile: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    password: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    gender: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState(""); //Global search
  const [selectedUsers, setSelectedUsers] = useState(null); //Checkbox
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false); //dialog visibility for all users
  const [deleteProductDialog, setDeleteProductDialog] = useState(false); //dialog visibility for a single user
  const toast = useRef(null); //display dialogs
  const dt = useRef(null);
  const cols = [
    { field: "username", header: "UserName" },
    { field: "mobile", header: "Phone Number" },
    { field: "email", header: "Email" },
    { field: "password", header: "Password" },
    { field: "gender", header: "Gender" },
  ];

  const getdata = async () => {
    const resp = await axios.get(API_URL);
    setUserData(resp.data);
  };

  useEffect(() => {
    getdata();
  }, []);

  // GLOBAL CLEAR
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  //CLEAR BUTTON
  const clearFilter = () => {
    initFilters();
  };
  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      mobile: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      password: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      gender: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between">
        <h4 className="my-auto">User List</h4>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          className="rounded"
          onClick={clearFilter}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const header = renderHeader();

  //GLOBAL DELETE

  const RedirecttoLoginpage = () => {
    Navigate("/");
  };
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          className="mx-2 rounded"
          onClick={RedirecttoLoginpage}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="rounded"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedUsers || !selectedUsers.length}
        />
      </div>
    );
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const deleteSelectedProducts = () => {
    let _products = userdata.filter((val) => !selectedUsers.includes(val));

    setUserData(_products);
    setDeleteProductsDialog(false);
    setSelectedUsers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  //YES OR NO BUTTON
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        className="me-2 rounded"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        className="rounded"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };
  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, userdata);
        doc.save("userdata.pdf");
      });
    });
  };
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(userdata);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "products");
    });
  };
  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };
  const rightToolbarTemplate = () => {
    return (
      <div className="flex align-items-center justify-content-end gap-2">
        <Button
          type="button"
          icon="pi pi-file"
          className="rounded-5"
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          className="mx-2 rounded-5"
          icon="pi pi-file-excel"
          severity="success"
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          className="rounded-5"
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    );
  };

  //EDIT AND DELETE BUTTON

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };
  //Update
  const handleUpdate = (userdata) => {
    localStorage.setItem("id", userdata.id);
    localStorage.setItem("username", userdata.username);
    localStorage.setItem("number", userdata.mobile);
    localStorage.setItem("email", userdata.email);
    localStorage.setItem("password", userdata.cpassword);
    localStorage.setItem("cpassword", userdata.password);
    localStorage.setItem("gender", userdata.gender);
    localStorage.setItem("nationality", userdata.nationality);
    localStorage.setItem("dob", userdata.dob);
    localStorage.setItem("lang", userdata.languages);
    Navigate("/update1");
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          outlined
          className="me-1 rounded-5 edit"
          onClick={() => handleUpdate(rowData)}
        />
        <Button
          icon="pi pi-trash"
          outlined
          severity="danger"
          className="rounded-5 delete"
          onClick={() => {
            confirmDeleteProduct(rowData);
            setSelectedUsers([rowData]);
          }}
        />
      </React.Fragment>
    );
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProduct = () => {
    let _products = userdata.filter((val) => val.id !== product.id);

    setUserData(_products);
    setDeleteProductDialog(false);
    setProduct(emptyData);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        className="me-2 rounded"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        className="rounded"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  return (
    <div>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        start={leftToolbarTemplate}
        end={rightToolbarTemplate}
      ></Toolbar>
      <div className="card">
        <DataTable
          ref={dt}
          value={userdata}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15, 20]}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          globalFilterFields={[
            "username",
            "mobile",
            "email",
            "password",
            "gender",
          ]}
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value)}
          header={header}
          emptyMessage="no user found"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          {cols.map((col, index) => (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              sortable
              filter
              filterPlaceholder="Search"
              style={{ minWidth: "12rem" }}
            />
          ))}
          <Column
            body={actionBodyTemplate}
            header="Action"
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
        <Dialog
          visible={deleteProductDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "20px" }}
            />
            &nbsp;
            {product && (
              <span>
                Are you sure you want to delete &nbsp;<b>{product.username}</b>?
              </span>
            )}
          </div>
        </Dialog>
        <Dialog
          visible={deleteProductsDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "20px" }}
            />
            &nbsp;
            {userdata && (
              <span>
                Are you sure you want to delete the selected products?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
export default Read1;

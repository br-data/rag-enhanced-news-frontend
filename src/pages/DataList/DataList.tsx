import React from "react";
import items from "./data.json";
import {
  DetailsList,
  ConstrainMode,
  DetailsListLayoutMode,
  SelectionMode,
  mergeStyleSets,
  TooltipHost,
  CheckboxVisibility,
  IRenderFunction,
  IDetailsHeaderProps,
  IDetailsColumnRenderTooltipProps,
} from "@fluentui/react";

const columns = [
  {
    key: "orderNumber",
    name: "Order Number",
    fieldName: "orderNumber",
    minWidth: 50,
    maxWidth: 100,
  },
  {
    key: "orderDate",
    name: "Order Date",
    fieldName: "orderDate",
    minWidth: 100,
    maxWidth: 200,
  },
  {
    key: "supplier",
    name: "Supplier",
    fieldName: "supplier",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "product",
    name: "Product",
    fieldName: "product",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "productQty",
    name: "Quantity",
    fieldName: "productQty",
    minWidth: 50,
    maxWidth: 100,
    isResizable: true,
  },
  {
    key: "remark",
    name: "Remark",
    fieldName: "remark",
    minWidth: 200,
    maxWidth: 300,
    isResizable: true,
  },
];

const gridStyles = {
  root: {
    selectors: {
      "& [role=grid]": {
        height: "70vh",
      },
    },
  },
};

const classNames = mergeStyleSets({
  header: {
    margin: ".5em 0",
  },
});

const DataList: React.FunctionComponent = (props) => {
  const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (
    props,
    defaultRender,
  ) => {
    if (!props) {
      return null;
    }
    const onRenderColumnHeaderTooltip: IRenderFunction<
      IDetailsColumnRenderTooltipProps
    > = (tooltipHostProps) => <TooltipHost {...tooltipHostProps} />;

    return defaultRender
      ? defaultRender({
          ...props,
          onRenderColumnHeaderTooltip,
        })
      : null;
  };

  return (
    <div>
      <h1 className={classNames.header}>Purchase List</h1>
      <DetailsList
        styles={gridStyles}
        items={items}
        columns={columns}
        checkboxVisibility={CheckboxVisibility.always}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        constrainMode={ConstrainMode.unconstrained}
        selectionMode={SelectionMode.multiple}
        onRenderDetailsHeader={onRenderDetailsHeader}
        selectionPreservedOnEmptyClick
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      />{" "}
    </div>
  );
};

export default DataList;

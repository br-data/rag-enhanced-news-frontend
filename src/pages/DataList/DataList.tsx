import React from "react";
import wires from "../../data/wires.json";
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
import { useHistory } from "react-router-dom"; // Assuming you're using react-router

const columns = [
  {
    key: "created_at",
    name: "Date",
    fieldName: "created_at",
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: "headline",
    name: "Headline",
    fieldName: "headline",
    minWidth: 100,
    maxWidth: 200,
  },
  {
    key: "teaser",
    name: "Teaser",
    fieldName: "teaser",
    minWidth: 100,
    maxWidth: 200,
  },
  {
    key: "geosubject_names",
    name: "Location",
    fieldName: "geosubject_names",
    minWidth: 100,
    maxWidth: 200,
  },
  {
    key: "urgency",
    name: "Urgency",
    fieldName: "urgency",
    minWidth: 50,
    maxWidth: 100,
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

const DataList: React.FunctionComponent = () => {
  const history = useHistory();

  const handleRowClick = (item: any) => {
    history.push(`/wires/details/${item.id}`);
  };

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
      <h1 className={classNames.header}>All News Wires</h1>
      <DetailsList
        styles={gridStyles}
        items={wires}
        columns={columns}
        checkboxVisibility={CheckboxVisibility.always}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        constrainMode={ConstrainMode.unconstrained}
        selectionMode={SelectionMode.none}
        onRenderDetailsHeader={onRenderDetailsHeader}
        selectionPreservedOnEmptyClick
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        onItemInvoked={handleRowClick}
      />{" "}
    </div>
  );
};

export default DataList;

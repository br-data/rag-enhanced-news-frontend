import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  DetailsRow,
  IDetailsRowProps,
} from "@fluentui/react";

import wiresAll from "../../data/wires-all.json";
import wiresWorld from "../../data/wires-world.json";
import wiresGermany from "../../data/wires-germany.json";
import wiresBavaria from "../../data/wires-bavaria.json";

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

interface DataListProps {
  route: {
    key: string;
  };
}

const DataList: React.FunctionComponent<DataListProps> = (props) => {
  interface GenericData {
    [key: string]: any;
  }

  const [key, setKey] = useState(props.route.key);
  const [data, setData] = useState<GenericData[] | undefined>();

  useEffect(() => {
    setKey(props.route.key);

    switch (key) {
      case "world":
        setData(wiresWorld);
        break;
      case "germany":
        setData(wiresGermany);
        break;
      case "bavaria":
        setData(wiresBavaria);
        break;
      default:
        setData(wiresAll);
        break;
    }

    // // Dynamic JSON imports are still broke. Maybe this will work in the near feature.
    // const loadJSONData = async () => {
    //   try {
    //     const data = await import(`../../data/wires-${key || "all"}.json`);
    //     console.log(data.map((d: any) => d));
    //     setData(JSON.parse(data));
    //   } catch (err) {
    //     console.error(err);
    //     console.error(`Failed to load data for key: ${key}`);
    //   }
    // };

    // loadJSONData();
  }, [props.route.key]);

  const history = useHistory();

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

  const onRenderRow = (props?: IDetailsRowProps): JSX.Element => {
    if (props) {
      return (
        <div
          onClick={() => handleRowClick(props.item)}
          style={{ cursor: "pointer" }}
        >
          <DetailsRow {...props} />
        </div>
      );
    }
    return <div />;
  };

  const handleRowClick = (item: any) => {
    history.push(`/wires/details/${item.id}`);
  };

  return (
    <>
      <h1 className={classNames.header}>Latest News</h1>
      {data && (
        <DetailsList
          styles={gridStyles}
          items={data}
          columns={columns}
          checkboxVisibility={CheckboxVisibility.always}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          constrainMode={ConstrainMode.unconstrained}
          selectionMode={SelectionMode.none}
          onRenderDetailsHeader={onRenderDetailsHeader}
          onRenderRow={onRenderRow}
          selectionPreservedOnEmptyClick
          ariaLabelForSelectionColumn="Toggle selection"
        />
      )}
    </>
  );
};

export default DataList;

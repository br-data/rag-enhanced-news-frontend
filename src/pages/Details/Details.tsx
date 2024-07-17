import React from "react";
import { mergeStyleSets, PrimaryButton } from "@fluentui/react";
import { useParams } from "react-router-dom";

import items from "../DataList/data.json";

const Details: React.FunctionComponent = () => {
  interface RouteParams {
    id: string;
  }

  const { id } = useParams<RouteParams>();

  const item = items.find((item) => item.id === id);

  function handleOnClick(): void {
    console.log("Primary button clicked");
  }

  const classNames = mergeStyleSets({
    header: {
      margin: ".5em 0",
    },
  });

  return (
    <div>
      <h1 className={classNames.header}>{item?.headline}</h1>
      <p>{item?.created_at}</p>
      <div dangerouslySetInnerHTML={{ __html: item?.article_html || "" }} />
      <PrimaryButton
        text="Primary"
        onClick={handleOnClick}
        allowDisabledFocus
      />
    </div>
  );
};

export default Details;

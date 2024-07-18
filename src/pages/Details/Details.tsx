import React from "react";
import {
  mergeStyleSets,
  PrimaryButton,
  Shimmer,
  Spinner,
  Stack,
} from "@fluentui/react";
import { useParams } from "react-router-dom";

import wires from "../../data/wires.json";
import mockResponse from "../../data/response.json";
import useFetch from "../../global/hooks/useFetch";

const Details: React.FunctionComponent = () => {
  interface RouteParams {
    id: string;
  }

  const { id } = useParams<RouteParams>();
  const wire = wires.find((item) => item.id === id);

  interface Data {
    [key: string]: any;
  }

  const url =
    "https://br24-geschichten-function.azurewebsites.net/api/Repeater?code=hwgMw21CRcLF_6DZve8hFWqKnzDst2NzrdAwztrObka4AzFuo0_gKg%3D%3D";
  const body: Data = mockResponse;

  const { data, loading, error, executeFetch } = useFetch<Data>(url, {
    method: "POST",
    body,
  });

  const classNames = mergeStyleSets({
    header: {
      margin: ".5em 0",
    },
    selectors: {
      "& > .ms-Shimmer-container": {
        margin: "2px 0",
      },
    },
  });

  return (
    <div>
      <h1 className={classNames.header}>{wire?.headline}</h1>
      <p>{wire?.created_at}</p>
      <div dangerouslySetInnerHTML={{ __html: wire?.article_html || "" }} />
      {loading && (
        <Spinner
          label="Searching for possible text enrichments"
          ariaLive="assertive"
          labelPosition="right"
        />
      )}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {/* <Stack className={classNames.selectors}>
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </Stack> */}
      <Stack>
        <Stack.Item align="end">
          <PrimaryButton
            text="Primary"
            onClick={executeFetch}
            allowDisabledFocus
          />
        </Stack.Item>
      </Stack>
    </div>
  );
};

export default Details;

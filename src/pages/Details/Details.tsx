import React from "react";
import {
  Icon,
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

  interface GenericData {
    [key: string]: any;
  }

  interface Response {
    id: string;
    headline: string;
    enhanced_info: string;
    questions?: Questions[] | null;
  }

  interface Questions {
    question: string;
    links?: string[] | null;
  }

  const url =
    "https://br24-geschichten-function.azurewebsites.net/api/Repeater?code=hwgMw21CRcLF_6DZve8hFWqKnzDst2NzrdAwztrObka4AzFuo0_gKg%3D%3D";
  const body: GenericData = mockResponse;

  const { data, loading, error, executeFetch } = useFetch<Response>(url, {
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
    <div style={{ marginBottom: "2rem" }}>
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
      {data && (
        <>
          <section
            style={{
              margin: "2rem 0",
              paddingLeft: "15px",
              borderLeft: "5px solid #0078d4",
            }}
          >
            <h3>More info</h3>
            <p dangerouslySetInnerHTML={{ __html: data.enhanced_info || "" }} />
          </section>
          <section>
            <h3>Questions and sources</h3>
            <ul
              style={{
                padding: "0",
                listStyle: "inside",
              }}
            >
              {data.questions?.map((question, index) => (
                <li key={index}>
                  {question.question} (
                  {question.links?.map((link, index) => (
                    <a href={link} target="_blank" rel="noreferrer">
                      Quelle {index + 1}
                    </a>
                  ))}
                  )
                </li>
              ))}
            </ul>
          </section>
          <section style={{
              margin: "2rem 0",
            }}>
            <em>
              <Icon iconName="Warning" style={{ marginRight: "0.5rem" }} />
              Please make sure to double check the generated content and
              sources.
            </em>
          </section>
        </>
      )}
      {/* <Stack className={classNames.selectors}>
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </Stack> */}
      {!!!data && (
        <Stack>
          <Stack.Item align="center">
            <PrimaryButton
              style={{ marginTop: "1rem" }}
              text="Generate enrichments"
              onClick={executeFetch}
              iconProps={{ iconName: "CompassNW" }}
              allowDisabledFocus
            />
          </Stack.Item>
        </Stack>
      )}
    </div>
  );
};

export default Details;

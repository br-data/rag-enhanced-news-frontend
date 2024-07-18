import React, { useEffect, useState } from "react";
import {
  mergeStyleSets,
  Persona,
  PersonaSize,
  PrimaryButton,
  Spinner,
  Stack,
  TextField,
} from "@fluentui/react";
import { useParams } from "react-router-dom";

import wires from "../../data/wires-all.json";
import mockResponse from "../../data/response.json";
import useFetch from "../../global/hooks/useFetch";

const Details: React.FunctionComponent = () => {
  interface GenericResponse {
    Hintergrund: any;
    questions_and_answers: any[];
  }

  interface GenericRequest {
    [key: string]: any;
  }

  interface RouteParams {
    id: string;
  }

  const { id } = useParams<RouteParams>();
  const wire = wires.find((item) => item.id === id);
  const [url, setUrl] = useState<string>(
    "http://accio.germanywestcentral.cloudapp.azure.com:8000/generate-enriched-report",
  );
  const [body, setBody] = useState<GenericRequest>(mockResponse);

  useEffect(() => {
    if (id === "demo") {
      setUrl(
        "https://br24-geschichten-function.azurewebsites.net/api/Repeater?code=hwgMw21CRcLF_6DZve8hFWqKnzDst2NzrdAwztrObka4AzFuo0_gKg%3D%3D",
      );
      setBody(mockResponse);
    } else {
      setUrl(
        "http://accio.germanywestcentral.cloudapp.azure.com:8000/generate-enriched-report",
      );
      setBody({ meldung: wire?.article_html });
    }
  }, [id]);

  const [sleeping, setSleeping] = useState(false);

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const { data, loading, error, executeFetch } = useFetch<GenericResponse>(
    url,
    {
      method: "POST",
      body,
    },
  );

  console.log("data", data);

  const handleClick = async () => {
    setSleeping(true);
    await sleep(0);
    // await sleep(5000);
    executeFetch();
    setSleeping(false);
  };

  const classNames = mergeStyleSets({
    container: { marginBottom: "2rem" },
    header: { margin: ".5em 0" },
    loading: { marginTop: "2rem" },
    enhancedInfo: {
      margin: "2rem 0",
      paddingLeft: "15px",
      borderLeft: "5px solid #0078d4",
    },
    list: { padding: "0", listStyle: "inside" },
    warning: { margin: "2rem 0", backgroundColor: "#f4f4f4", padding: "1rem" },
  });

  return (
    <div className={classNames.container}>
      <h1 className={classNames.header}>{wire?.headline}</h1>
      <p>{wire?.created_at}</p>
      <div dangerouslySetInnerHTML={{ __html: wire?.article_html || "" }} />
      {(sleeping || loading) && (
        <Stack className={classNames.loading}>
          <Spinner
            label="Searching for possible text enrichments"
            ariaLive="assertive"
            labelPosition="right"
          />
        </Stack>
      )}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          <section className={classNames.enhancedInfo}>
            <h3>More info</h3>
            <p dangerouslySetInnerHTML={{ __html: data.Hintergrund || "" }} />
          </section>
          <section>
            <h3>Questions and sources</h3>
            <ul className={classNames.list}>
              {data.questions_and_answers?.map((question, index) => (
                <li key={`question-${index}`}>
                  {question.question} (
                  {question.links &&
                    question.links?.length &&
                    question.links?.map((link: string, index: number) => (
                      <>
                        <a
                          key={`link-${index}`}
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Source {index + 1}
                        </a>
                        {index === question.links!.length - 1 ? "" : ", "}
                      </>
                    ))}
                  )
                </li>
              ))}
            </ul>
          </section>
          <h3 className={classNames.loading}>Custom search</h3>
          <Stack horizontal verticalAlign="center">
            <Stack.Item>
              <Persona
                imageInitials="JP"
                size={PersonaSize.size40}
                imageAlt="Jörg Pfeiffer"
              />
            </Stack.Item>
            <Stack.Item grow={true}>
              <TextField placeholder="Type your own question ..." />
            </Stack.Item>
          </Stack>
          <section className={classNames.warning}>
            <em>
              ⚠️ Please make sure to double-check the generated content and
              sources.
            </em>
          </section>
        </>
      )}
      {!data && !loading && !sleeping && (
        <Stack>
          <Stack.Item align="center">
            <PrimaryButton
              style={{ marginTop: "1rem" }}
              text="Generate enrichments"
              onClick={handleClick}
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

import { copyToClipboard } from "../shared/helpers";
import { MinimalFlagsData } from "../shared/models";
import "./mainList.css";

interface Props {
  data: MinimalFlagsData;
  fav?: boolean;
}

export function MainList({ data, fav }: Props) {
  const countriesData = [];

  for (const [, /* region */ regionObject] of Object.entries(data)) {
    for (const [code, codeObject] of Object.entries(regionObject)) {
      const flag = codeObject.flag || "";
      const name = codeObject.name || "";
      const unMember = codeObject.unMember;

      const element = (
        <div
          key={`${name}-flag-block-${code}-${fav}`}
          className={`flags-block ${!unMember ? "notUnMember" : ""}`}
        >
          <div
            className="flag"
            onClick={() => copyToClipboard(codeObject)}
            title={name}
          >
            {flag}
          </div>
          <div className="country">{name}</div>
        </div>
      );
      countriesData.push(element);
    }
  }

  return (
    <>
      <p>with {countriesData.length} flags</p>
      <div className="flags-block-container">{countriesData}</div>
    </>
  );
}

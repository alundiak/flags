
import { copyToClipboard } from '../shared/helpers';
import { MinimalFlagsData } from '../shared/models';
import './mainList.css'

export function MainList({ data }: { data: MinimalFlagsData }) {
  const countriesData = [];

  for (const [/* region */, regionObject] of Object.entries(data)) {
    // console.log(region, regionObject);
    for (const [code, codeObject] of Object.entries(regionObject)) {
      // console.log(code, codeObject);
      const flag = codeObject.flag || '';
      const name = codeObject.name || '';
      const unMember = codeObject.unMember;
      const element = (
        <div key={`flag-block-${code}`} className={`flags-block ${!unMember ? 'notUnMember' : ''}`}>
          <div className="flag" onClick={() => copyToClipboard(codeObject)} title={name}>{flag}</div>
          <div className="country">{name}</div>
        </div>
      );
      countriesData.push(element);
    }
  }

  return (
    <>
      <p>with {countriesData.length} flags</p>
      <div className="flags-block-container">
        {countriesData}
      </div>
    </>
  )
}

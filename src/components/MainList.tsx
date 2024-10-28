
import { copyToClipboard } from '../shared/helpers';
import { MinimalFlagsData } from '../shared/models';
import './mainList.css'

export function MainList({ data }: MinimalFlagsData) {

  const unCountriesData = [];
  const nonUNcountriesData = [];

  for (const [/* region */, regionObject] of Object.entries(data)) {
    // console.log(region, regionObject);
    for (const [code, codeObject] of Object.entries(regionObject)) {
      // console.log(code, codeObject);
      const flag = codeObject.flag || '';
      const name = codeObject.name || '';
      const unMember = codeObject.unMember;
      const element = (
        <div key={`flag-block-${code}`} className="flags-block">
          <div className="flag" onClick={() => copyToClipboard(codeObject)} title={name}>{flag}</div>
          {/* <div className="country">{country}</div> */}
        </div>
      );

      if (unMember) {
        unCountriesData.push(element);
      } else {
        nonUNcountriesData.push(element);
      }

    }
  }

  return (
    <div id="flags-container">
      <h3>{unCountriesData.length} UN members</h3>
      <div className="flags-block-container">
        {unCountriesData}
      </div>

      <h3>{nonUNcountriesData.length} non-UN members</h3>
      <div className="flags-block-container">
        {nonUNcountriesData}
      </div>
    </div>
  )
}

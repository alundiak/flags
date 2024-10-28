function createFlagButtons(flagsData, isUnMember, dataLength) {
  const mainContainer = document.getElementById('flags-container');

  const h3Element = document.createElement('h3');
  if (isUnMember) {
    h3Element.textContent = `${dataLength} UN members`;
  } else {
    h3Element.textContent = `${dataLength} non-UN members`;
  }
  mainContainer.appendChild(h3Element);

  const flagsBlockContainer = document.createElement('div');
  flagsBlockContainer.classList.add('flags-block-container');


  for (const [region, regionObject] of Object.entries(flagsData)) {
    for (const [code, codeObject] of Object.entries(regionObject)) {
      const divBlock = document.createElement('div');
      divBlock.className = 'flags-block';
      if (!isUnMember) {
        divBlock.classList.add('notUnMember');
      }

      const divFlag = document.createElement('div');
      divFlag.className = 'flag';

      const divCountry = document.createElement('div');
      divCountry.className = 'country';

      // vA
      divFlag.textContent = `${codeObject.flag}`;
      divFlag.title = `${codeObject.name}`;
      divCountry.textContent = `${codeObject.name}`;

      // vB
      // const keys = Object.keys(codeObject);
      // const flagEmoji = keys[0];
      // const countryName = codeObject[flagEmoji];
      // divFlag.textContent = `${flagEmoji}`;
      // divCountry.textContent = `${countryName}`;

      divFlag.onclick = () => copyToClipboard(codeObject);

      divBlock.appendChild(divFlag);
      divBlock.appendChild(divCountry);

      flagsBlockContainer.appendChild(divBlock);
    }
  }

  mainContainer.appendChild(flagsBlockContainer);
}

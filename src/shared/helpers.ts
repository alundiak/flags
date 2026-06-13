import { baseUrl, options } from "./constants";
import { CodeObject, MinimalFlagsData } from "./models";

// @ts-expect-error
Array.prototype.sortByCountryCommonName = function () {
  return this.sort((a: any, b: any) => {
    // Ensure that each element has the name.common property before comparing
    return a.names.common.localeCompare(b.names.common);
  });
};

export async function getRestCountriesFromApi() {
  // GET some fields /countries/v5?response_fields=names.common,codes.alpha_2,flag.emoji

  // try {
  const response = await fetch(baseUrl, options);
  const result = await response.json();
  return result;
  // } catch (error) {
  //   console.error("Error fetching restcountries.com API v5:", error);
  //   return {};
  // }
}

export function extractFilteringByUnMember(countriesApiData: any[] = []) {
  return countriesApiData.reduce(
    (result: any, obj: any) => {
      const unMember = obj?.memberships?.un ?? false;

      if (unMember) {
        result.unMembers.push(obj);
      } else {
        result.nonUnMembers.push(obj);
      }
      return result;
    },
    { unMembers: [], nonUnMembers: [] },
  );
}

export function composeCountryFlagsData(
  countriesData: any[] = [],
): MinimalFlagsData {
  const simplifiedData: MinimalFlagsData = {};

  countriesData.forEach((obj: any) => {
    const region = obj.region;
    simplifiedData[region] = simplifiedData[region] || {};
    const code = obj.codes.alpha_2.toLowerCase();

    simplifiedData[region][code] = {
      flag: obj.flag.emoji,
      code: code || "no-code-territory",
      name: obj.names.common,
      unMember: obj.memberships.un,
      euMember: obj.memberships.eu,
      natoMember: obj.memberships.nato,
    };
  });

  return simplifiedData;
}

function showToast(message: string) {
  const toast = document.createElement("div");
  toast.className = "my-toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 2000);
}

// @ts-expect-error
function copyToClipboardBasic(str: string, callback: () => void) {
  navigator.clipboard
    .writeText(str)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

async function copyToClipboardSimplified(str: string, callback: () => void) {
  await navigator.clipboard.writeText(str);
  callback();
}

// @ts-expect-error
function copyToClipboardWithWorkaround(str: string, callback: () => void) {
  // When DevTools is opened, and JavaScript code is debugged, then copying causes and error in code:
  // "NotAllowedError: Failed to execute 'writeText' on 'Clipboard': Document is not focused."
  // Workaround actually doesn't work, but Copying WORKS OK when DevTools is CLOSED.
  // https://stackoverflow.com/questions/56306153/domexception-on-calling-navigator-clipboard-readtext
  setTimeout(async () => {
    await navigator.clipboard
      .writeText(str)
      .then(() => {
        callback();
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, 0);
}

export function copyToClipboard(codeObject: CodeObject) {
  const flagEmoji = codeObject.flag;
  const countryName = codeObject.name;

  const callback = () => {
    showToast(`Copied: ${flagEmoji} ${countryName}`);
  };

  // copyToClipboardBasic(flagEmoji, callback);
  copyToClipboardSimplified(flagEmoji, callback);
  // copyToClipboardWithWorkaround(flagEmoji, callback);
}

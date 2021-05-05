document.addEventListener('DOMContentLoaded', updatePhone);

function updatePhone() {
  const phoneEl = document.getElementById('phone');
  phoneEl.innerText = getDynamicPhone();
}

function getDynamicPhone() {
  const foundPhone = findPhone();
  const storageKey = 'dynamicPhone';
  if (!!foundPhone) {
    sessionStorage.setItem(storageKey, foundPhone);
    return foundPhone;
  }

  const storagePhone = sessionStorage.getItem(storageKey);
  const defaultPhone = '+79185105106';
  return storagePhone || defaultPhone;
}

function findPhone() {
  const params = getParams();
  const phonesMap = getPhonesMap();
  const phones = Object.keys(phonesMap);
  return phones.find(phone => {
    const phoneParams = phonesMap[phone];
    const phoneParamsKeys = Object.keys(phoneParams);
    return phoneParamsKeys.every(key => params[key] && params[key] === phoneParams[key]);
  });
}

function getParams() {
  const paramsStr = window.location.search;
  const paramsChips = paramsStr.slice(1).split('&');
  return paramsChips.reduce((acc, paramsChip) => {
    const [key, value] = paramsChip.split('=');
    acc[key] = value;
    return acc;
  }, {});
}

function getPhonesMap() {
  return {
    '+79999999999': {
      'utm_source': 'aaa',
      'utm_medium': 'bbb',
      'utm_term': 'ccc',
      'utm_campaign': 'ddd'
    },
    '+73333333333': {
      'utm_source': 'eee'
    },
    '+72222222222': {
      'utm_source': 'fff',
      'utm_medium': 'ggg',
      'utm_campaign': 'ddd'
    }
  };
}

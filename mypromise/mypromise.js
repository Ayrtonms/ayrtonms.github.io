let customPromise = function(promise) {
  let tempPromise = promise instanceof Promise ? promise : new Promise(promise);

  let next = (result, callback) => {
    callback(result);

    return result;
  };

  return {
    done: (callback) => {
      return customPromise(tempPromise.then((result) => next(result, callback)));
    },
    fail: (callback) => {
      return customPromise(tempPromise.catch((result) => next(result, callback)));
    },
    always: (callback) => {
      return customPromise(tempPromise.then((result) => next(result, callback), (result) => next(result, callback)));
    }
  };
};

let parseRes = function(response) {
  let res = {};
			
  res.text = response.responseText;
  res.status = response.status;

  try {
    res.json = JSON.parse(response.responseText);
  } catch (error) {
    res.json = null;
  }

  return res;
};

let myajax = function(type, url, data) {
  let utype = type.toUpperCase();

  if(['GET', 'POST', 'DELETE'].indexOf(utype) === -1) {
    throw new Error('Invalid request!');
  }

  return customPromise((resolve, reject) => {
    let request = new XMLHttpRequest();

   	request.onloadend = () => {
      let response = parseRes(request);

      if(response.status === 200) {
        resolve(response.json || response.text);
      }
      else {
        reject(response);
      }
    };

    request.open(utype, fullUrl);
    request.setRequestHeader("X-REQUESTED-WITH", 'XMLHttpRequest');
    request.send(data);
  });
};

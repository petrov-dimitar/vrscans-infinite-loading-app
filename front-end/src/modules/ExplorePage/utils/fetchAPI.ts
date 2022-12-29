export function FetchAPI(endpoint = '') {
  let response: any;
  fetch(process.env.REACT_APP_API_URL + endpoint)
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      response
        .json()
        .then((res) => {
          response = res;
        })
        .catch((er) => console.log(er));
    })
    .catch((err) => {
      console.log('err', err);
    });

  return response;
}

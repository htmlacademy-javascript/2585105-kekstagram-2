const API_BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const ApiRoutes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessages = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить данные формы',
};


const fetchData = async (route, errorMessage = null, method = HttpMethods.GET, body = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}${route}`, { method, body });

    if (!response.ok) {
      throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
    }

    return response.json();

  } catch (err) {
    throw new Error(errorMessage ?? err.message);
  }
};


const fetchDataFromApi = () => fetchData(ApiRoutes.GET_DATA, ErrorMessages.GET_DATA);
const sendDataToApi = (body) => fetchData(ApiRoutes.SEND_DATA, ErrorMessages.SEND_DATA, HttpMethods.POST, body);

export { fetchDataFromApi, sendDataToApi };

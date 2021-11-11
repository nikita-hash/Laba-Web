import axios from 'axios';

class AccrualService {
    closeDay() {
        return axios.get("http://localhost:8080/api/closeDay");
    }
}

export default new AccrualService();
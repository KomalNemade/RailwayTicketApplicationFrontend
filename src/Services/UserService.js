import axios from "axios";
const User_ADD="http://localhost:8085/user/add";
const User_GET="http://localhost:8085/user/";
const User_Login="http://localhost:8085/user/login";
const Trains_GET="http://localhost:8085/trains/";
const Trains_No="http://localhost:8085/trains/trainno";
const Trains_Source="http://localhost:8085/trains/src";
const Trains_Destination="http://localhost:8085/trains/dest";
const Trains_Date="http://localhost:8085/trains/bydate";
const Add_Train="http://localhost:8085/trains/add";
class UserService {
    addUser(user) {
        return axios.post(User_ADD, user);
    }

    login(user) {
        return axios.post(User_Login, user);
    }

    get(user) {
        return axios.get(User_GET, user);
    }

    getTrains() {
        return axios.get(Trains_GET);
    }

    getNo() {
        return axios.get(Trains_No);
    }

    getSource() {
        return axios.get(Trains_Source);
    }

    getDestination() {
        return axios.get(Trains_Destination);
    }

    getDate() {
        return axios.get(Trains_Date);
    }

    addTrain(train) {
        console.log(train);
        return axios.post(Add_Train,train);
    }


}
export default new UserService();
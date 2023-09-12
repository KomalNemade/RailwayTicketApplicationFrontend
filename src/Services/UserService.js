import axios from "axios";
const User_ADD="http://localhost:8085/user/add";
const User_GET="http://localhost:8085/user/";
const User_Login="http://localhost:8085/user/login";
const Trains_GET="http://localhost:8085/trains/";
const GET_Train="http://localhost:8085/trains/search"
const Add_Train="http://localhost:8085/trains/add";
const Train_update="http://localhost:8085/trains/train/";
const Get_TrainById="http://localhost:8085/trains/id/";
const Add_Ticket="http://localhost:8085/ticket/add";
const Get_Tickets="http://localhost:8085/ticket/";
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

    getTrain(src,des){
        return axios.get(GET_Train,{
            params: {
                source: src,
                destination: des
            }
        })
    }

    addTrain(train) {
        return axios.post(Add_Train,train);
    }

    getTrainById(id){
        return axios.get(Get_TrainById+id)
    }

    addTicket(ticket) {
        return axios.post(Add_Ticket,ticket);
    }
    getBookings(){
        return axios.get(Get_Tickets);
    }
    updateTrain(id,train){
        return axios.put(Train_update+id,train);
    }

}
export default new UserService();
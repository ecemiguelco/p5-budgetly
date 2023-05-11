import axios from "axios";

export const BASE_URL = "http://localhost:42069/";

export const axiosPostNewAccount = async (props) => {
  try {
    const { newAcc, setSelectedOption, setAccountName, setStartingAmount, onClose } = props;
    const res = await axios.post(BASE_URL + "dashboard", { ...newAcc });
    setSelectedOption("");
    setAccountName("");
    setStartingAmount(0);
    onClose();
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const axiosPostNewRecord = async (props) => {
  try {
    const { newTran, setSelectedAccName, setTransacType, setAmount, onClose } = props;
    const res = await axios.post(BASE_URL + "dashboard", { ...newTran });
    setSelectedAccName("");
    setTransacType("Expense");
    setAmount("");
    onClose();
    return res;
  } catch (err) {
    console.log(err);
  }
};

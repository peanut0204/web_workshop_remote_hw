import axios from "axios";


const useSkills = (studentId) => 
  new Promise((resolve, reject) => {
    axios.get(`https://api.projectszero.tech/skills/${studentId}`)
      .then((response) => {console.log("in UseSkills", response.data), resolve(response.data)})
      .catch((error) => reject(error));
  });


export default useSkills;
